"""
Build the Master Psychology & Social Sciences Survey Statistics Template (APA 7th Edition)
Using openpyxl with real mathematical formulas, APA styling, and automated interpretations.
"""
import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_workbook():
    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)
    
    # Define styles & colors
    navy_dark = "1E293B"      # Dark slate/navy for headers
    navy_light = "334155"
    indigo_primary = "4F46E5"  # Modern Indigo
    indigo_light = "EEF2FF"
    green_soft = "ECFDF5"      # Light green for user input cells
    green_border = "10B981"
    blue_soft = "F0F9FF"       # Soft blue for calculation cells
    gold_soft = "FEF3C7"       # Gold accent for key final results
    gray_border = "CBD5E1"
    
    font_family = "Segoe UI"
    
    title_font = Font(name=font_family, size=14, bold=True, color="1E293B")
    section_font = Font(name=font_family, size=11, bold=True, color="FFFFFF")
    sub_font = Font(name=font_family, size=11, bold=True, color="1E293B")
    regular_font = Font(name=font_family, size=10, color="334155")
    italic_font = Font(name=font_family, size=10, italic=True, color="334155")
    bold_stat_font = Font(name=font_family, size=10, bold=True, color="1E293B")
    
    header_fill = PatternFill(fill_type="solid", fgColor=navy_dark)
    indigo_header_fill = PatternFill(fill_type="solid", fgColor=indigo_primary)
    input_fill = PatternFill(fill_type="solid", fgColor=green_soft)
    calc_fill = PatternFill(fill_type="solid", fgColor=blue_soft)
    highlight_fill = PatternFill(fill_type="solid", fgColor=gold_soft)
    
    thin_side = Side(style='thin', color=gray_border)
    thick_top = Side(style='medium', color="000000")
    double_bottom = Side(style='double', color="000000")
    single_bottom = Side(style='thin', color="000000")
    
    box_border = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
    apa_header_border = Border(top=thick_top, bottom=single_bottom)
    apa_footer_border = Border(bottom=double_bottom)

    # =========================================================================
    # 1. Start_Here Sheet
    # =========================================================================
    ws1 = wb.create_sheet(title="Start_Here")
    ws1.views.sheetView[0].showGridLines = True
    
    ws1.column_dimensions['A'].width = 4
    ws1.column_dimensions['B'].width = 28
    ws1.column_dimensions['C'].width = 70
    
    ws1.merge_cells("B2:C2")
    ws1["B2"] = "🎓 Thesis & Survey Statistics Master Template (APA 7th Edition)"
    ws1["B2"].font = Font(name=font_family, size=16, bold=True, color="1E293B")
    
    ws1.merge_cells("B3:C3")
    ws1["B3"] = "Ready-made statistical engine for Psychology, Cognitive Science, and Social Science research."
    ws1["B3"].font = italic_font
    
    # Legend
    ws1.merge_cells("B5:C5")
    ws1["B5"] = "Color Code Legend"
    ws1["B5"].font = sub_font
    
    legend_items = [
        ("🟩 Light Green Cells", "DATA INPUT: Paste your raw survey item scores or values here.", input_fill),
        ("🟦 Soft Blue Cells", "AUTOMATED FORMULAS: Do not edit; calculated dynamically.", calc_fill),
        ("🟨 Gold / Yellow Cells", "KEY APA SUMMARY RESULTS: Ready to paste into your thesis.", highlight_fill)
    ]
    for idx, (label, desc, fill) in enumerate(legend_items, start=6):
        ws1[f"B{idx}"] = label
        ws1[f"B{idx}"].font = bold_stat_font
        ws1[f"B{idx}"].fill = fill
        ws1[f"B{idx}"].border = box_border
        ws1[f"C{idx}"] = desc
        ws1[f"C{idx}"].font = regular_font
        ws1[f"C{idx}"].border = box_border

    # QuickStart Steps
    ws1.merge_cells("B10:C10")
    ws1["B10"] = "Quick 5-Step Workflow"
    ws1["B10"].font = sub_font
    
    steps = [
        ("Step 1: Codebook", "Review the 'Codebook' tab to verify item names, scale ranges, and reverse scoring rules."),
        ("Step 2: Paste Raw Data", "Paste your participants' responses into 'Raw_Data' (sample 50 participants included)."),
        ("Step 3: Check Reliability", "View 'Reliability_Analysis' to verify Cronbach's Alpha (α ≥ .70 is considered acceptable)."),
        ("Step 4: Check Hypotheses", "Check 'Hypothesis_tTests' for group differences and Cohen's d effect sizes."),
        ("Step 5: Copy APA Tables", "Copy pre-formatted tables from 'APA7_Formatted_Tables' straight into Word or Google Docs.")
    ]
    for idx, (step, detail) in enumerate(steps, start=11):
        ws1[f"B{idx}"] = step
        ws1[f"B{idx}"].font = bold_stat_font
        ws1[f"B{idx}"].border = box_border
        ws1[f"C{idx}"] = detail
        ws1[f"C{idx}"].font = regular_font
        ws1[f"C{idx}"].border = box_border

    # Citation & Support
    ws1["B17"] = "Recommended Citation in Thesis:"
    ws1["B17"].font = bold_stat_font
    ws1["C17"] = "Statistical analyses were conducted using the APA 7th Edition Survey Analysis Framework."
    ws1["C17"].font = italic_font

    # =========================================================================
    # 2. Codebook Sheet
    # =========================================================================
    ws2 = wb.create_sheet(title="Codebook")
    ws2.views.sheetView[0].showGridLines = True
    
    headers_codebook = ["Variable ID", "Construct / Measure Name", "Items Count", "Response Scale", "Reverse-Scored Items", "Scoring Method"]
    widths_codebook = [16, 32, 14, 26, 24, 28]
    
    ws2["A1"] = "Variable Codebook & Measurement Specifications"
    ws2["A1"].font = title_font
    
    for c_idx, (h, w) in enumerate(zip(headers_codebook, widths_codebook), start=1):
        cell = ws2.cell(row=3, column=c_idx, value=h)
        cell.font = section_font
        cell.fill = indigo_header_fill
        cell.alignment = Alignment(horizontal='center', vertical='center')
        ws2.column_dimensions[get_column_letter(c_idx)].width = w
        
    codebook_data = [
        ("PID", "Participant Identifier", "1", "Alphanumeric (P001...)", "None", "Unique ID"),
        ("Gender", "Self-reported Gender", "1", "1 = Female, 2 = Male, 3 = Other", "None", "Categorical Grouping"),
        ("Age", "Participant Age", "1", "Continuous (Years)", "None", "Numeric Demographic"),
        ("Group", "Intervention Condition", "1", "1 = Control, 2 = Treatment", "None", "Independent Variable"),
        ("PSS_Total", "Perceived Stress Scale (PSS-10)", "10", "1 = Never to 5 = Very Often", "Items 4, 5, 7, 8 (Reverse)", "Mean Composite Score"),
        ("Sleep_Total", "Sleep Quality Index (PSQI-7)", "7", "1 = Very Poor to 5 = Very Good", "None", "Mean Composite Score"),
        ("GPA", "Academic Performance (GPA)", "1", "0.00 to 4.00 Grade Point", "None", "Continuous Outcome")
    ]
    for r_idx, row in enumerate(codebook_data, start=4):
        for c_idx, val in enumerate(row, start=1):
            cell = ws2.cell(row=r_idx, column=c_idx, value=val)
            cell.font = regular_font
            cell.border = box_border
            if c_idx in [1, 3]:
                cell.alignment = Alignment(horizontal='center')

    # Reverse Scoring Box
    ws2.merge_cells("A13:F13")
    ws2["A13"] = "💡 How to Reverse-Score Negative Survey Items in Excel"
    ws2["A13"].font = sub_font
    
    ws2.merge_cells("A14:F14")
    ws2["A14"] = "Formula: = (ScaleMax + ScaleMin) - RawScore. For example, on a 1-to-5 Likert scale: = 6 - RawScore (so 1 becomes 5, 2 becomes 4, etc.)."
    ws2["A14"].font = italic_font

    # =========================================================================
    # 3. Raw_Data Sheet (Pre-populated with 50 realistic survey participants)
    # =========================================================================
    ws3 = wb.create_sheet(title="Raw_Data")
    ws3.views.sheetView[0].showGridLines = True
    
    # Headers
    raw_headers = [
        "Participant_ID", "Gender", "Age", "Group",
        "PSS_1", "PSS_2", "PSS_3", "PSS_4_Rev", "PSS_5_Rev", "PSS_6", "PSS_7_Rev", "PSS_8_Rev", "PSS_9", "PSS_10",
        "Sleep_1", "Sleep_2", "Sleep_3", "Sleep_4", "Sleep_5", "Sleep_6", "Sleep_7",
        "GPA", "PSS_Mean", "Sleep_Mean"
    ]
    for c_idx, h in enumerate(raw_headers, start=1):
        cell = ws3.cell(row=1, column=c_idx, value=h)
        cell.font = section_font
        if c_idx <= 4:
            cell.fill = header_fill
        elif c_idx <= 14:
            cell.fill = indigo_header_fill
        elif c_idx <= 21:
            cell.fill = PatternFill(fill_type="solid", fgColor="0D9488") # Teal
        elif c_idx == 22:
            cell.fill = header_fill
        else:
            cell.fill = PatternFill(fill_type="solid", fgColor="B45309") # Amber
        cell.alignment = Alignment(horizontal='center', vertical='center')
        ws3.column_dimensions[get_column_letter(c_idx)].width = 13
    
    # Generate 50 realistic rows of mock psychological survey data
    import random
    random.seed(42) # Reproducible
    
    for i in range(1, 51):
        r = i + 1
        pid = f"P{i:03d}"
        gender = random.choice([1, 1, 2, 2, 1, 2])
        age = random.randint(19, 28)
        group = 1 if i <= 25 else 2 # 25 Control, 25 Treatment
        
        # PSS items (Group 2 has slightly lower stress due to intervention)
        base_stress = 3.4 if group == 1 else 2.6
        pss_items = [max(1, min(5, int(random.gauss(base_stress, 0.8)))) for _ in range(10)]
        
        # Sleep items (Group 2 has better sleep)
        base_sleep = 2.8 if group == 1 else 3.8
        sleep_items = [max(1, min(5, int(random.gauss(base_sleep, 0.7)))) for _ in range(7)]
        
        # GPA (moderately negatively correlated with stress)
        gpa = round(max(2.1, min(4.0, 3.8 - (base_stress * 0.25) + random.gauss(0, 0.25))), 2)
        
        # Write inputs
        row_vals = [pid, gender, age, group] + pss_items + sleep_items + [gpa]
        for c_idx, val in enumerate(row_vals, start=1):
            cell = ws3.cell(row=r, column=c_idx, value=val)
            cell.font = regular_font
            cell.border = box_border
            cell.fill = input_fill
            cell.alignment = Alignment(horizontal='center')
            
        # Write automated composite formulas
        # PSS_Mean in col W (col 23)
        pss_mean_cell = ws3.cell(row=r, column=23, value=f"=AVERAGE(E{r}:N{r})")
        pss_mean_cell.font = bold_stat_font
        pss_mean_cell.fill = calc_fill
        pss_mean_cell.border = box_border
        pss_mean_cell.number_format = "0.00"
        pss_mean_cell.alignment = Alignment(horizontal='center')
        
        # Sleep_Mean in col X (col 24)
        sleep_mean_cell = ws3.cell(row=r, column=24, value=f"=AVERAGE(O{r}:U{r})")
        sleep_mean_cell.font = bold_stat_font
        sleep_mean_cell.fill = calc_fill
        sleep_mean_cell.border = box_border
        sleep_mean_cell.number_format = "0.00"
        sleep_mean_cell.alignment = Alignment(horizontal='center')

    # =========================================================================
    # 4. Reliability_Analysis Sheet (Cronbach's Alpha Engine)
    # =========================================================================
    ws4 = wb.create_sheet(title="Reliability_Analysis")
    ws4.views.sheetView[0].showGridLines = True
    
    ws4.column_dimensions['A'].width = 4
    ws4.column_dimensions['B'].width = 26
    ws4.column_dimensions['C'].width = 20
    ws4.column_dimensions['D'].width = 24
    ws4.column_dimensions['E'].width = 26
    ws4.column_dimensions['F'].width = 20
    ws4.column_dimensions['G'].width = 24
    
    ws4["B2"] = "Internal Consistency Analysis (Cronbach's Alpha α)"
    ws4["B2"].font = title_font
    
    ws4["B3"] = "Formula: α = [k / (k - 1)] * [1 - (Σ s_i² / s_total²)]"
    ws4["B3"].font = italic_font
    
    # Scale 1: PSS-10
    ws4.merge_cells("B5:D5")
    ws4["B5"] = "Scale 1: Perceived Stress Scale (PSS-10)"
    ws4["B5"].font = section_font
    ws4["B5"].fill = indigo_header_fill
    ws4["B5"].alignment = Alignment(horizontal='center')
    
    ws4["B6"] = "Item"
    ws4["B6"].font = bold_stat_font
    ws4["B6"].border = box_border
    ws4["C6"] = "Item Variance (s_i²)"
    ws4["C6"].font = bold_stat_font
    ws4["C6"].border = box_border
    ws4["D6"] = "Item Mean (M)"
    ws4["D6"].font = bold_stat_font
    ws4["D6"].border = box_border
    
    pss_cols = ["E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]
    for idx, col in enumerate(pss_cols, start=1):
        row = 6 + idx
        ws4[f"B{row}"] = f"PSS_Item_{idx}"
        ws4[f"B{row}"].font = regular_font
        ws4[f"B{row}"].border = box_border
        
        ws4[f"C{row}"] = f"=VAR.S(Raw_Data!{col}2:{col}51)"
        ws4[f"C{row}"].font = regular_font
        ws4[f"C{row}"].number_format = "0.000"
        ws4[f"C{row}"].border = box_border
        
        ws4[f"D{row}"] = f"=AVERAGE(Raw_Data!{col}2:{col}51)"
        ws4[f"D{row}"].font = regular_font
        ws4[f"D{row}"].number_format = "0.00"
        ws4[f"D{row}"].border = box_border
        
    # PSS Summary calculations
    ws4["B17"] = "Number of Items (k)"
    ws4["B17"].font = bold_stat_font
    ws4["B17"].border = box_border
    ws4["C17"] = 10
    ws4["C17"].font = bold_stat_font
    ws4["C17"].border = box_border
    
    ws4["B18"] = "Sum of Item Variances (Σ s_i²)"
    ws4["B18"].font = bold_stat_font
    ws4["B18"].border = box_border
    ws4["C18"] = "=SUM(C7:C16)"
    ws4["C18"].font = bold_stat_font
    ws4["C18"].number_format = "0.000"
    ws4["C18"].border = box_border
    
    ws4["B19"] = "Variance of Total Score (s_total²)"
    ws4["B19"].font = bold_stat_font
    ws4["B19"].border = box_border
    # Total sum score variance: sum of E..N for each row
    ws4["C19"] = "=VAR.S(Raw_Data!W2:W51)*100" # Scaled sum variance
    ws4["C19"].font = bold_stat_font
    ws4["C19"].number_format = "0.000"
    ws4["C19"].border = box_border
    
    ws4["B20"] = "Cronbach's Alpha (α)"
    ws4["B20"].font = Font(name=font_family, size=11, bold=True, color="1E293B")
    ws4["B20"].fill = highlight_fill
    ws4["B20"].border = box_border
    ws4["C20"] = "=(C17/(C17-1))*(1-(C18/C19))"
    ws4["C20"].font = Font(name=font_family, size=11, bold=True, color="1E293B")
    ws4["C20"].number_format = "0.000"
    ws4["C20"].fill = highlight_fill
    ws4["C20"].border = box_border
    
    ws4["B21"] = "Internal Consistency Rating"
    ws4["B21"].font = bold_stat_font
    ws4["B21"].border = box_border
    ws4["C21"] = '=IF(C20>=0.9,"Excellent (α ≥ .90)",IF(C20>=0.8,"Good (.80 ≤ α < .90)",IF(C20>=0.7,"Acceptable (.70 ≤ α < .80)",IF(C20>=0.6,"Questionable (.60 ≤ α < .70)","Poor (α < .60)"))))'
    ws4["C21"].font = bold_stat_font
    ws4["C21"].border = box_border

    # Scale 2: Sleep Quality (PSQI-7)
    ws4.merge_cells("E5:G5")
    ws4["E5"] = "Scale 2: Sleep Quality Index (7 items)"
    ws4["E5"].font = section_font
    ws4["E5"].fill = PatternFill(fill_type="solid", fgColor="0D9488")
    ws4["E5"].alignment = Alignment(horizontal='center')
    
    ws4["E6"] = "Item"
    ws4["E6"].font = bold_stat_font
    ws4["E6"].border = box_border
    ws4["F6"] = "Item Variance (s_i²)"
    ws4["F6"].font = bold_stat_font
    ws4["F6"].border = box_border
    ws4["G6"] = "Item Mean (M)"
    ws4["G6"].font = bold_stat_font
    ws4["G6"].border = box_border
    
    sleep_cols = ["O", "P", "Q", "R", "S", "T", "U"]
    for idx, col in enumerate(sleep_cols, start=1):
        row = 6 + idx
        ws4[f"E{row}"] = f"Sleep_Item_{idx}"
        ws4[f"E{row}"].font = regular_font
        ws4[f"E{row}"].border = box_border
        
        ws4[f"F{row}"] = f"=VAR.S(Raw_Data!{col}2:{col}51)"
        ws4[f"F{row}"].font = regular_font
        ws4[f"F{row}"].number_format = "0.000"
        ws4[f"F{row}"].border = box_border
        
        ws4[f"G{row}"] = f"=AVERAGE(Raw_Data!{col}2:{col}51)"
        ws4[f"G{row}"].font = regular_font
        ws4[f"G{row}"].number_format = "0.00"
        ws4[f"G{row}"].border = box_border

    # Sleep Summary calculations
    ws4["E14"] = "Number of Items (k)"
    ws4["E14"].font = bold_stat_font
    ws4["E14"].border = box_border
    ws4["F14"] = 7
    ws4["F14"].font = bold_stat_font
    ws4["F14"].border = box_border
    
    ws4["E15"] = "Sum of Item Variances (Σ s_i²)"
    ws4["E15"].font = bold_stat_font
    ws4["E15"].border = box_border
    ws4["F15"] = "=SUM(F7:F13)"
    ws4["F15"].font = bold_stat_font
    ws4["F15"].number_format = "0.000"
    ws4["F15"].border = box_border
    
    ws4["E16"] = "Variance of Total Score (s_total²)"
    ws4["E16"].font = bold_stat_font
    ws4["E16"].border = box_border
    ws4["F16"] = "=VAR.S(Raw_Data!X2:X51)*49" # Scaled sum variance
    ws4["F16"].font = bold_stat_font
    ws4["F16"].number_format = "0.000"
    ws4["F16"].border = box_border
    
    ws4["E17"] = "Cronbach's Alpha (α)"
    ws4["E17"].font = Font(name=font_family, size=11, bold=True, color="1E293B")
    ws4["E17"].fill = highlight_fill
    ws4["E17"].border = box_border
    ws4["F17"] = "=(F14/(F14-1))*(1-(F15/F16))"
    ws4["F17"].font = Font(name=font_family, size=11, bold=True, color="1E293B")
    ws4["F17"].number_format = "0.000"
    ws4["F17"].fill = highlight_fill
    ws4["F17"].border = box_border
    
    ws4["E18"] = "Internal Consistency Rating"
    ws4["E18"].font = bold_stat_font
    ws4["E18"].border = box_border
    ws4["F18"] = '=IF(F17>=0.9,"Excellent (α ≥ .90)",IF(F17>=0.8,"Good (.80 ≤ α < .90)",IF(F17>=0.7,"Acceptable (.70 ≤ α < .80)",IF(F17>=0.6,"Questionable (.60 ≤ α < .70)","Poor (α < .60)"))))'
    ws4["F18"].font = bold_stat_font
    ws4["F18"].border = box_border

    # =========================================================================
    # 5. Descriptives Sheet
    # =========================================================================
    ws5 = wb.create_sheet(title="Descriptives")
    ws5.views.sheetView[0].showGridLines = True
    
    ws5["A1"] = "Summary Descriptive Statistics & Normality Check"
    ws5["A1"].font = title_font
    
    desc_headers = ["Variable Name", "N", "Mean (M)", "Std Dev (SD)", "Median", "Variance", "Min", "Max", "Skewness", "Kurtosis", "Normality"]
    desc_widths = [24, 8, 12, 14, 10, 10, 8, 8, 12, 12, 18]
    
    for c_idx, (h, w) in enumerate(zip(desc_headers, desc_widths), start=1):
        cell = ws5.cell(row=3, column=c_idx, value=h)
        cell.font = section_font
        cell.fill = header_fill if c_idx == 1 else indigo_header_fill
        cell.alignment = Alignment(horizontal='center', vertical='center')
        ws5.column_dimensions[get_column_letter(c_idx)].width = w
        
    vars_desc = [
        ("Perceived Stress (PSS Mean)", "Raw_Data!W2:W51"),
        ("Sleep Quality (Sleep Mean)", "Raw_Data!X2:X51"),
        ("Academic GPA", "Raw_Data!V2:V51"),
        ("Participant Age", "Raw_Data!C2:C51")
    ]
    for idx, (var_name, rng) in enumerate(vars_desc, start=4):
        ws5[f"A{idx}"] = var_name
        ws5[f"A{idx}"].font = bold_stat_font
        ws5[f"A{idx}"].border = box_border
        
        ws5[f"B{idx}"] = f"=COUNT({rng})"
        ws5[f"C{idx}"] = f"=AVERAGE({rng})"
        ws5[f"D{idx}"] = f"=STDEV.S({rng})"
        ws5[f"E{idx}"] = f"=MEDIAN({rng})"
        ws5[f"F{idx}"] = f"=VAR.S({rng})"
        ws5[f"G{idx}"] = f"=MIN({rng})"
        ws5[f"H{idx}"] = f"=MAX({rng})"
        ws5[f"I{idx}"] = f"=SKEW({rng})"
        ws5[f"J{idx}"] = f"=KURT({rng})"
        ws5[f"K{idx}"] = f'=IF(AND(I{idx}>=-1.5,I{idx}<=1.5,J{idx}>=-1.5,J{idx}<=1.5),"Normal (|z| < 1.5)","Check Distribution")'
        
        for c in ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]:
            c_cell = ws5[f"{c}{idx}"]
            c_cell.font = regular_font
            c_cell.border = box_border
            c_cell.alignment = Alignment(horizontal='center')
            if c in ["C", "D", "E", "F", "I", "J"]:
                c_cell.number_format = "0.00"
            elif c == "K":
                c_cell.font = bold_stat_font

    ws5["A10"] = "Note: Skewness and kurtosis values between -1.5 and +1.5 indicate acceptable univariate normality for parametric tests."
    ws5["A10"].font = italic_font

    # =========================================================================
    # 6. Hypothesis_tTests Sheet
    # =========================================================================
    ws6 = wb.create_sheet(title="Hypothesis_tTests")
    ws6.views.sheetView[0].showGridLines = True
    
    ws6.column_dimensions['A'].width = 4
    ws6.column_dimensions['B'].width = 28
    ws6.column_dimensions['C'].width = 22
    ws6.column_dimensions['D'].width = 22
    ws6.column_dimensions['E'].width = 24
    
    ws6["B2"] = "Inferential Statistics: Independent Samples t-Test"
    ws6["B2"].font = title_font
    
    ws6["B3"] = "Testing differences between Control Group (Group = 1) vs Intervention Group (Group = 2)"
    ws6["B3"].font = italic_font
    
    ws6.merge_cells("B5:E5")
    ws6["B5"] = "Primary Outcome 1: Perceived Stress Scale (PSS)"
    ws6["B5"].font = section_font
    ws6["B5"].fill = indigo_header_fill
    ws6["B5"].alignment = Alignment(horizontal='center')
    
    t_labels = [
        ("Control Group Sample Size (n1)", "25"),
        ("Treatment Group Sample Size (n2)", "25"),
        ("Control Mean (M1)", "=AVERAGE(Raw_Data!W2:W26)"),
        ("Control Std Dev (SD1)", "=STDEV.S(Raw_Data!W2:W26)"),
        ("Treatment Mean (M2)", "=AVERAGE(Raw_Data!W27:W51)"),
        ("Treatment Std Dev (SD2)", "=STDEV.S(Raw_Data!W27:W51)"),
        ("Degrees of Freedom (df = n1 + n2 - 2)", "=C6+C7-2"),
        ("Pooled Standard Deviation (s_p)", "=SQRT((((C6-1)*(C9^2))+((C7-1)*(C11^2)))/C12)"),
        ("t-Statistic", "=(C8-C10)/(C13*SQRT((1/C6)+(1/C7)))"),
        ("p-Value (Two-tailed)", "=T.TEST(Raw_Data!W2:W26,Raw_Data!W27:W51,2,2)"),
        ("Cohen's d Effect Size", "=ABS(C8-C10)/C13"),
        ("Effect Size Interpretation", '=IF(C16>=0.8,"Large Effect (d ≥ 0.80)",IF(C16>=0.5,"Medium Effect (d ≥ 0.50)",IF(C16>=0.2,"Small Effect (d ≥ 0.20)","Negligible (d < 0.20)")))')
    ]
    for idx, (label, val) in enumerate(t_labels, start=6):
        ws6[f"B{idx}"] = label
        ws6[f"B{idx}"].font = bold_stat_font
        ws6[f"B{idx}"].border = box_border
        
        ws6[f"C{idx}"] = val
        ws6[f"C{idx}"].font = bold_stat_font
        ws6[f"C{idx}"].border = box_border
        ws6[f"C{idx}"].alignment = Alignment(horizontal='center')
        if idx in [8, 9, 10, 11, 13, 14, 16]:
            ws6[f"C{idx}"].number_format = "0.00"
        elif idx == 15: # p-value
            ws6[f"C{idx}"].number_format = "0.000"
            ws6[f"C{idx}"].fill = highlight_fill
        elif idx in [16, 17]:
            ws6[f"C{idx}"].fill = highlight_fill

    # Fill-in-the-blank thesis sentence right below!
    ws6.merge_cells("B19:E19")
    ws6["B19"] = "📝 APA 7th Edition Ready Write-Up (Copy directly to Thesis Results):"
    ws6["B19"].font = sub_font
    
    ws6.merge_cells("B20:E21")
    ws6["B20"] = '="An independent samples t-test revealed that participants in the intervention condition (M = " & TEXT(C10,"0.00") & ", SD = " & TEXT(C11,"0.00") & ") reported significantly lower stress than participants in the control condition (M = " & TEXT(C8,"0.00") & ", SD = " & TEXT(C9,"0.00") & "), t(" & C12 & ") = " & TEXT(C14,"0.00") & ", p " & IF(C15<0.001,"< .001","= " & TEXT(C15,".000")) & ", d = " & TEXT(C16,"0.00") & "."'
    ws6["B20"].font = Font(name=font_family, size=10, italic=True, color="1E293B")
    ws6["B20"].fill = calc_fill
    ws6["B20"].border = box_border
    ws6["B20"].alignment = Alignment(wrap_text=True, vertical='top')

    # =========================================================================
    # 7. Correlation_Matrix Sheet
    # =========================================================================
    ws7 = wb.create_sheet(title="Correlation_Matrix")
    ws7.views.sheetView[0].showGridLines = True
    
    ws7["A1"] = "Bivariate Pearson Correlation Matrix (r)"
    ws7["A1"].font = title_font
    
    correl_vars = [
        ("1. Perceived Stress", "Raw_Data!W2:W51"),
        ("2. Sleep Quality", "Raw_Data!X2:X51"),
        ("3. Academic GPA", "Raw_Data!V2:V51"),
        ("4. Age", "Raw_Data!C2:C51")
    ]
    
    headers_correl = ["Variable", "M", "SD", "1", "2", "3", "4"]
    widths_correl = [24, 10, 10, 14, 14, 14, 14]
    
    for c_idx, (h, w) in enumerate(zip(headers_correl, widths_correl), start=1):
        cell = ws7.cell(row=3, column=c_idx, value=h)
        cell.font = section_font
        cell.fill = indigo_header_fill
        cell.alignment = Alignment(horizontal='center', vertical='center')
        ws7.column_dimensions[get_column_letter(c_idx)].width = w
        
    for r_idx, (name, rng_r) in enumerate(correl_vars, start=4):
        ws7[f"A{r_idx}"] = name
        ws7[f"A{r_idx}"].font = bold_stat_font
        ws7[f"A{r_idx}"].border = box_border
        
        # M and SD
        ws7[f"B{r_idx}"] = f"=AVERAGE({rng_r})"
        ws7[f"B{r_idx}"].font = regular_font
        ws7[f"B{r_idx}"].number_format = "0.00"
        ws7[f"B{r_idx}"].border = box_border
        ws7[f"B{r_idx}"].alignment = Alignment(horizontal='center')
        
        ws7[f"C{r_idx}"] = f"=STDEV.S({rng_r})"
        ws7[f"C{r_idx}"].font = regular_font
        ws7[f"C{r_idx}"].number_format = "0.00"
        ws7[f"C{r_idx}"].border = box_border
        ws7[f"C{r_idx}"].alignment = Alignment(horizontal='center')
        
        # Matrix correlations
        for c_num, (_, rng_c) in enumerate(correl_vars, start=1):
            col_letter = chr(67 + c_num) # D, E, F, G
            c_cell = ws7[f"{col_letter}{r_idx}"]
            c_cell.border = box_border
            c_cell.alignment = Alignment(horizontal='center')
            
            if c_num == (r_idx - 3):
                c_cell.value = "—"
                c_cell.font = bold_stat_font
            elif c_num < (r_idx - 3):
                # Lower triangle with automated correlation formula
                c_cell.value = f"=CORREL({rng_r}, {rng_c})"
                c_cell.font = regular_font
                c_cell.number_format = "0.00"
            else:
                c_cell.value = "" # Upper triangle empty in APA style

    ws7["A9"] = "Note. N = 50. Correlation values in lower diagonal. * p < .05. ** p < .01."
    ws7["A9"].font = italic_font

    # =========================================================================
    # 8. APA7_Formatted_Tables Sheet (Strict APA 7 publication format)
    # =========================================================================
    ws8 = wb.create_sheet(title="APA7_Formatted_Tables")
    ws8.views.sheetView[0].showGridLines = True
    
    ws8.column_dimensions['A'].width = 4
    ws8.column_dimensions['B'].width = 28
    ws8.column_dimensions['C'].width = 10
    ws8.column_dimensions['D'].width = 10
    ws8.column_dimensions['E'].width = 10
    ws8.column_dimensions['F'].width = 12
    ws8.column_dimensions['G'].width = 12
    ws8.column_dimensions['H'].width = 12
    
    # Table 1 Title
    ws8["B2"] = "Table 1"
    ws8["B2"].font = Font(name="Times New Roman", size=11, bold=True)
    
    ws8["B3"] = "Descriptive Statistics, Internal Reliability, and Intercorrelations for Study Variables"
    ws8["B3"].font = Font(name="Times New Roman", size=11, italic=True)
    
    # APA Headers
    apa_headers = ["Variable", "M", "SD", "α", "1", "2", "3"]
    for c_idx, h in enumerate(apa_headers, start=2):
        col_letter = get_column_letter(c_idx)
        cell = ws8[f"{col_letter}5"]
        cell.value = h
        cell.font = Font(name="Times New Roman", size=11, italic=(h in ["M", "SD", "α"]))
        cell.alignment = Alignment(horizontal='center' if c_idx > 2 else 'left')
        cell.border = Border(top=thick_top, bottom=single_bottom)
        
    apa_rows = [
        ("1. Perceived Stress", "=Descriptives!C4", "=Descriptives!D4", "=Reliability_Analysis!C20", "—", "", ""),
        ("2. Sleep Quality", "=Descriptives!C5", "=Descriptives!D5", "=Reliability_Analysis!F17", "=Correlation_Matrix!D5", "—", ""),
        ("3. Academic GPA", "=Descriptives!C6", "=Descriptives!D6", "—", "=Correlation_Matrix!D6", "=Correlation_Matrix!E6", "—")
    ]
    for r_idx, r_vals in enumerate(apa_rows, start=6):
        is_last = (r_idx == 8)
        b_bottom = single_bottom if is_last else None
        
        for c_idx, val in enumerate(r_vals, start=2):
            col_letter = get_column_letter(c_idx)
            cell = ws8[f"{col_letter}{r_idx}"]
            cell.value = val
            cell.font = Font(name="Times New Roman", size=11)
            cell.alignment = Alignment(horizontal='center' if c_idx > 2 else 'left')
            cell.border = Border(bottom=b_bottom)
            if c_idx in [3, 4, 5, 6, 7, 8] and str(val).startswith("="):
                cell.number_format = "0.00"

    ws8["B10"] = "Note. N = 50. M = mean; SD = standard deviation; α = Cronbach's alpha reliability coefficient."
    ws8["B10"].font = Font(name="Times New Roman", size=10, italic=True)
    ws8["B11"] = "* p < .05. ** p < .01 (two-tailed)."
    ws8["B11"].font = Font(name="Times New Roman", size=10)

    # Save workbook
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, "Survey_Thesis_Stats_Master_Template.xlsx")
    wb.save(out_path)
    print(f"Master Excel Workbook created successfully at:\n  {out_path}")
    return out_path

if __name__ == "__main__":
    build_workbook()
