# 🧹 Seisuvai Catering — Menu Data Classifier & Scraper Utility

> Data extraction and classification tool for transforming raw catering menus into structured JSON, CSV, and SQL formats.

---

## 📌 Features

- **Raw Text Parsing**: Reads unstructured raw menu text from `raw_menu.txt`.
- **Classification Engine (`menuClassifier.js`)**: Categorizes dishes into South Indian culinary sections (Breakfast, Main Course, Gravies, Poriyal/Kootu, Desserts, Beverages).
- **Multi-Format Export**: Outputs clean datasets in `output/` directory as:
  - `menu.json`
  - `menu.csv`
  - `menu.sql`

---

## 🚀 Execution

```bash
# Run data extraction & categorization pipeline
node index.js
```

Outputs will be populated inside `scraper/output/`.
