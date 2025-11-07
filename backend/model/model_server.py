from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import joblib
import io

app = FastAPI()

# Allow CORS (so your React frontend can access the backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load saved model components
model = joblib.load("model.pkl")
mlb = joblib.load("mlb.pkl")
scaler = joblib.load("scaler.pkl")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    # --- Preprocess ---
    df.columns = (
        df.columns.str.strip()
                  .str.lower()
                  .str.replace(' ', '_')
                  .str.replace('[^0-9a-zA-Z_]', '', regex=True)
    )

    if 'name' not in df.columns:
        df['name'] = [f"Person_{i+1}" for i in range(len(df))]

    df = df.rename(columns={
        'teamwork_preference____like__1prefer_solo_5prefer_teams': 'teamwork_preference',
        'club_top_2': 'club_top2'
    })

    required_cols = ['club_top1', 'club_top2', 'hobby_top1', 'hobby_top2', 'teamwork_preference']
    df = df[[col for col in required_cols if col in df.columns] + ['name']]

    def clean(data):
        if pd.isnull(data):
            return None
        return str(data).strip().lower()

    for col in ['club_top1', 'club_top2', 'hobby_top1', 'hobby_top2']:
        if col in df.columns:
            df[col] = df[col].apply(clean)

    def make_interests(row):
        items = [row.get('club_top1'), row.get('club_top2'),
                 row.get('hobby_top1'), row.get('hobby_top2')]
        items = [x for x in items if x is not None]
        return list(dict.fromkeys(items))

    df['interests'] = df.apply(make_interests, axis=1)

    # --- Transform with saved encoders ---
    interest_matrix = mlb.transform(df['interests'])
    teamwork_scaled = scaler.transform(df[['teamwork_preference']])
    final_features = np.hstack([interest_matrix, teamwork_scaled])

    # --- Predict clusters ---
    df['cluster'] = model.fit_predict(final_features)

    # --- Return results ---
    result = df[['name', 'cluster']].to_dict(orient='records')
    return {"clusters": result}
