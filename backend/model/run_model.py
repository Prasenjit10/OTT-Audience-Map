# backend/model/run_model.py
# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.cluster import KMeans
import json, sys, os, warnings

warnings.filterwarnings("ignore")

# -------- Handle uploaded file path --------
if len(sys.argv) > 1:
    abs_path = sys.argv[1]  # use multer path directly
else:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

# -------- Load Data (CSV / Excel) --------
try:
    if abs_path.endswith(".csv"):
        df = pd.read_csv(abs_path)
    else:
        df = pd.read_excel(abs_path)
except Exception as e:
    print(json.dumps({"error": f"Failed to read file: {str(e)}"}))
    sys.exit(1)

# -------- Clean column names --------
df.columns = df.columns.str.strip()

# If there's no 'name' column, create one
if 'name' not in [c.lower() for c in df.columns]:
    df.insert(0, 'name', [f"Student_{i+1}" for i in range(len(df))])
else:
    # Normalize actual name column to 'name' (case-insensitive)
    name_col = None
    for c in df.columns:
        if c.strip().lower() == 'name':
            name_col = c
            break
    if name_col != 'name':
        df.rename(columns={name_col: 'name'}, inplace=True)

# -------- Required Columns mapping for OTT features --------
columns_map = {
    "Movie_genre_top1": None,
    "Series_genre_top1": None,
    "Ott Top1": None,
    "Content_lang_top1": None
}

for col in df.columns:
    clean = col.replace(" ", "").lower()
    if clean == "movie_genre_top1":
        columns_map["Movie_genre_top1"] = col
    elif clean == "series_genre_top1":
        columns_map["Series_genre_top1"] = col
    elif clean == "otttop1":
        columns_map["Ott Top1"] = col
    elif clean == "content_lang_top1":
        columns_map["Content_lang_top1"] = col

# If columns missing, exit with helpful error
if None in columns_map.values():
    # Include detected columns in error to help debug
    print(json.dumps({
        "error": "Required OTT columns missing",
        "found_columns": list(df.columns)
    }))
    sys.exit(1)

# Select the columns we need, but keep 'name'
selected_cols = ['name'] + list(columns_map.values())
df_sel = df[selected_cols].copy()
# rename OTT columns to stable keys
df_sel.columns = ['name'] + list(columns_map.keys())

# Clean strings and drop rows with missing important values
df_sel = df_sel.apply(lambda x: x.astype(str).str.strip())
df_sel = df_sel.replace({'nan': None})
df_sel.dropna(subset=list(columns_map.keys()), inplace=True)

# Label-encode categorical features (fit on this file)
encoder = LabelEncoder()
df_encoded = df_sel[list(columns_map.keys())].apply(encoder.fit_transform)

# KMeans
kmeans = KMeans(n_clusters=4, random_state=42)
df_sel['cluster'] = kmeans.fit_predict(df_encoded)

# Prepare output with names preserved
clusters_out = []
for c in sorted(df_sel['cluster'].unique()):
    group_rows = df_sel[df_sel['cluster'] == c]
    students = []
    for _, row in group_rows.iterrows():
        students.append({
            "name": row['name'],
            "movie_genre_top1": row['Movie_genre_top1'],
            "series_genre_top1": row['Series_genre_top1'],
            "ott_top1": row['Ott Top1'],
            "content_lang_top1": row['Content_lang_top1'],
            "cluster": int(row['cluster'])
        })
    clusters_out.append({
        "cluster_id": int(c),
        "students": students
    })

result = {
    "status": "success",
    "num_clusters": len(clusters_out),
    "clusters": clusters_out
}

print(json.dumps(result))
sys.exit(0)
