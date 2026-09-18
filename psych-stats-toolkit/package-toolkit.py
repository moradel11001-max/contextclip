"""
Bundle the Psychology Survey & Thesis Stats Toolkit into a customer-ready ZIP file.
"""
import os
import zipfile

def package_bundle():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    out_zip = os.path.join(base_dir, "Psych_Thesis_Stats_Toolkit_v1.0.zip")
    
    # Readme for customers
    readme_content = """========================================================================
 🎓 PSYCHOLOGY & SOCIAL SCIENCES THESIS STATISTICAL TOOLKIT (APA 7th)
========================================================================

Thank you for your purchase! This toolkit contains everything you need
to analyze your survey data and write an immaculate APA 7th Edition results
section for your thesis or research paper.

CONTENTS OF THIS PACKAGE:
------------------------------------------------------------------------
1. Survey_Thesis_Stats_Master_Template.xlsx
   - Your primary Excel workbook. Built with automated formulas:
     * Raw_Data (Paste your survey items here)
     * Reliability_Analysis (Automated Cronbach's Alpha calculator)
     * Descriptives (Mean, SD, Median, Skewness, Kurtosis normality checks)
     * Hypothesis_tTests (Independent & Paired t-tests with Cohen's d effect sizes)
     * Correlation_Matrix (Pearson r table with automated significance)
     * APA7_Formatted_Tables (Ready-to-copy clean tables into Word/Docs)

2. APA7_Results_Writing_Guide.md
   - Fill-in-the-blank academic reporting templates for:
     * Demographics & participant exclusion
     * Scale reliability write-ups
     * t-Test reporting (df, t-value, p-value, Cohen's d)
     * Pearson correlations
     * One-way ANOVA & Multiple Linear Regression
     * Top 7 thesis advisor red flags and how to avoid revisions.

3. survey_analyzer.py
   - Optional companion Python script for researchers who want 1-click
     batch analysis from a CSV file. Run with:
     python survey_analyzer.py

QUICK START IN 3 MINUTES:
------------------------------------------------------------------------
1. Open 'Survey_Thesis_Stats_Master_Template.xlsx' in Microsoft Excel,
   Google Sheets, or LibreOffice.
2. Read the 'Start_Here' tab.
3. Paste your survey items into 'Raw_Data'.
4. Check 'Reliability_Analysis' and 'Hypothesis_tTests'.
5. Copy your APA tables directly into your thesis manuscript!

NEED HELP OR QUESTIONS?
------------------------------------------------------------------------
Email: moradel11001@gmail.com
========================================================================
"""
    readme_path = os.path.join(base_dir, "README.txt")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(readme_content)

    files_to_pack = [
        "Survey_Thesis_Stats_Master_Template.xlsx",
        "APA7_Results_Writing_Guide.md",
        "survey_analyzer.py",
        "README.txt"
    ]
    
    print(f"Creating customer zip: {out_zip}")
    with zipfile.ZipFile(out_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for fname in files_to_pack:
            fpath = os.path.join(base_dir, fname)
            if os.path.exists(fpath):
                zf.write(fpath, fname)
                print(f"  + Added: {fname} ({os.path.getsize(fpath)} bytes)")
            else:
                print(f"  ! Warning: {fname} not found")

    size_kb = os.path.getsize(out_zip) / 1024
    print(f"\n[OK] Package created: {out_zip} ({size_kb:.1f} KB)")
    return out_zip

if __name__ == "__main__":
    package_bundle()
