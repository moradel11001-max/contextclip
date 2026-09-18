# APA 7th Edition Statistical Results Writing Guide & Template Pack
**For Psychology, Cognitive Science, and Social Science Theses & Papers**

---

## Table of Contents
1. [General APA 7th Edition Statistical Rules](#1-general-apa-7th-edition-statistical-rules)
2. [Participant Demographics Reporting](#2-participant-demographics-reporting)
3. [Scale Reliability (Cronbach’s Alpha) Template](#3-scale-reliability-cronbachs-alpha-template)
4. [Descriptive Statistics Reporting](#4-descriptive-statistics-reporting)
5. [Independent Samples t-Test Template](#5-independent-samples-t-test-template)
6. [Paired Samples t-Test Template](#6-paired-samples-t-test-template)
7. [Pearson Correlation Matrix Reporting](#7-pearson-correlation-matrix-reporting)
8. [One-Way ANOVA Reporting Template](#8-one-way-anova-reporting-template)
9. [Multiple Linear Regression Template](#9-multiple-linear-regression-template)
10. [Official APA 7 Table Formatting Checklist](#10-official-apa-7-table-formatting-checklist)
11. [Top 7 Thesis Advisor Red Flags & How to Avoid Them](#11-top-7-thesis-advisor-red-flags--how-to-avoid-them)

---

## 1. General APA 7th Edition Statistical Rules

Before writing your results, memorize these four golden APA rules:

1. **No Leading Zero on Bounded Statistics:**
   If a statistic cannot mathematically exceed 1.0 (such as $p$-values, correlations $r$, Cronbach's $\alpha$, and effect sizes $\eta^2$), **never** include a leading zero before the decimal point:
   - ✅ Correct: $p = .023$, $r = .42$, $\alpha = .87$
   - ❌ Incorrect: $p = 0.023$, $r = 0.42$, $\alpha = 0.87$
   *(Note: Statistics that can exceed 1.0 like $t$, $F$, $M$, $SD$, and Cohen’s $d$ **do** require leading zeros: $t = 2.45$, $d = 0.58$, $M = 3.65$).*

2. **Decimal Places:**
   - Report means ($M$), standard deviations ($SD$), test statistics ($t, F$), and effect sizes ($d, \eta^2$) to **two decimal places** (e.g., $M = 24.15$, $SD = 4.32$).
   - Report exact $p$-values to **three decimal places** (e.g., $p = .041$, $p = .120$).
   - If a software package prints $p = .000$, **never write $p = .000$**! Write $p < .001$.

3. **Italicization:**
   Italicize all statistical symbols and Latin letters representing statistics:
   - $N$ (total sample size), $n$ (subsample size)
   - $M$ (mean), $SD$ (standard deviation), $SE$ (standard error)
   - $p$ (probability), $t$ ($t$-statistic), $F$ ($F$-ratio)
   - $r$ (Pearson's correlation), $R^2$ (coefficient of determination)
   - $d$ (Cohen's $d$), $\beta$ (standardized regression weight - Greek letters are not italicized in APA, but $b$ unstandardized is).

4. **Spaces Around Operators:**
   Always place spaces around equals, greater-than, and less-than signs:
   - ✅ Correct: $t(48) = 2.31, p = .025, d = 0.65$
   - ❌ Incorrect: $t(48)=2.31,p=.025,d=0.65$

---

## 2. Participant Demographics Reporting

### Fill-in-the-Blank Template
> An initial sample of $[N_{initial}]$ participants completed the survey. Data from $[N_{excluded}]$ respondents were excluded prior to analysis due to $[reason: e.g., failure on attention check items / incomplete responses exceeding 20%]$(, resulting in a final analytical sample of $N = [N_{final}]$ ($[n_{female}]$ women, $[n_{male}]$ men, $[n_{other}]$ non-binary/other; $M_{age} = [MeanAge]$ years, $SD = [SDAge]$, range: $[MinAge]–[MaxAge]$ years). 

### Example
> "An initial sample of 165 participants completed the survey online. Data from 12 respondents were excluded prior to analysis due to failure on attention check items, resulting in a final analytical sample of $N = 153$ (88 women, 61 men, 4 non-binary/prefer not to say; $M_{age} = 22.41$ years, $SD = 3.84$, range: 18–34 years)."

---

## 3. Scale Reliability (Cronbach’s Alpha) Template

### Fill-in-the-Blank Template
> Internal consistency for all multi-item psychological instruments was evaluated using Cronbach's alpha ($\alpha$). The $[ScaleName]$ exhibited $[excellent / good / acceptable]$ reliability ($\alpha = [.XX]$, $[K]$ items). Similarly, the $[ScaleName2]$ demonstrated $[excellent / good / acceptable]$ reliability ($\alpha = [.XX]$, $[K]$ items). All scales met or exceeded the standard threshold of acceptability ($\alpha \ge .70$).

### Interpretation Benchmarks
- $\alpha \ge .90$: Excellent
- $.80 \le \alpha < .90$: Good
- $.70 \le \alpha < .80$: Acceptable
- $.60 \le \alpha < .70$: Questionable
- $\alpha < .60$: Poor / Unacceptable

### Example
> "Internal consistency for all multi-item psychological instruments was evaluated using Cronbach's alpha ($\alpha$). The Perceived Stress Scale (PSS-10) exhibited good reliability ($\alpha = .86$, 10 items). Similarly, the Pittsburgh Sleep Quality Index demonstrated acceptable internal consistency ($\alpha = .78$, 7 items). All scales met or exceeded the standard benchmark of acceptability ($\alpha \ge .70$)."

---

## 4. Descriptive Statistics Reporting

### Fill-in-the-Blank Template
> Descriptive statistics (means, standard deviations, and observed ranges) for all primary study variables are presented in Table 1. Overall, participants reported moderate levels of $[Variable1]$ ($M = [X.XX]$, $SD = [X.XX]$) and $[low / moderate / high]$ levels of $[Variable2]$ ($M = [X.XX]$, $SD = [X.XX]$). Skewness and kurtosis indices were within normal limits (between $-1.5$ and $+1.5$), supporting univariate normality.

---

## 5. Independent Samples t-Test Template

Used to compare two independent groups (e.g., Experimental vs. Control, or Gender groups).

### Fill-in-the-Blank Template (Significant Result)
> An independent samples $t$-test was conducted to examine differences in $[Dependent Variable]$ between $[Group 1]$ and $[Group 2]$. The assumption of homogeneity of variance was assessed via Levene’s test ($p > .05$). As hypothesized, participants in the $[Group 1]$ condition scored significantly $[higher / lower]$ on $[Dependent Variable]$ ($M = [X.XX]$, $SD = [X.XX]$) than participants in the $[Group 2]$ condition ($M = [X.XX]$, $SD = [X.XX]$), $t([df]) = [X.XX]$, $p = [.XXX]$, two-tailed, with a $[small / medium / large]$ effect size (Cohen's $d = [X.XX]$, $95\%$ CI $[XX.XX, XX.XX]$).

### Fill-in-the-Blank Template (Non-Significant Result)
> An independent samples $t$-test indicated no statistically significant difference in $[Dependent Variable]$ between $[Group 1]$ ($M = [X.XX]$, $SD = [X.XX]$) and $[Group 2]$ ($M = [X.XX]$, $SD = [X.XX]$), $t([df]) = [X.XX]$, $p = [.XXX]$, $d = [X.XX]$. 

### Cohen's $d$ Effect Size Benchmarks
- $d = 0.20$: Small effect
- $d = 0.50$: Medium effect
- $d = 0.80$: Large effect

---

## 6. Paired Samples t-Test Template

Used when comparing the same participants across two time points or conditions (e.g., Pre-test vs. Post-test).

### Fill-in-the-Blank Template
> A paired-samples $t$-test was conducted to evaluate the effect of $[intervention / manipulation]$ on $[variable]$. Participants demonstrated a statistically significant $[increase / decrease]$ in $[variable]$ from pre-test ($M = [X.XX]$, $SD = [X.XX]$) to post-test ($M = [X.XX]$, $SD = [X.XX]$), $t([df]) = [X.XX]$, $p = [.XXX]$, $d = [X.XX]$.

---

## 7. Pearson Correlation Matrix Reporting

Used to examine bivariate relationships among continuous psychological constructs.

### Fill-in-the-Blank Template
> Bivariate Pearson correlation coefficients were computed to investigate the relationships among study variables (see Table 2). In line with predictions, $[Variable 1]$ showed a significant $[positive / negative]$ correlation with $[Variable 2]$, $r([df]) = [.XX]$, $p = [.XXX]$. Conversely, $[Variable 1]$ was not significantly related to $[Variable 3]$, $r([df]) = [.XX]$, $p = [.XXX]$.

### Correlation Strength Guidelines
- $.10 \le |r| < .30$: Small / weak
- $.30 \le |r| < .50$: Moderate
- $|r| \ge .50$: Large / strong

---

## 8. One-Way ANOVA Reporting Template

Used when comparing three or more independent groups (e.g., Low, Medium, High Stress).

### Fill-in-the-Blank Template
> A one-way between-subjects analysis of variance (ANOVA) was conducted to compare the effect of $[Independent Variable / Grouping]$ ($[Group 1]$ vs. $[Group 2]$ vs. $[Group 3]$) on $[Dependent Variable]$. There was a statistically significant effect of $[Independent Variable]$ on $[Dependent Variable]$ at the $p < .05$ level for the three conditions, $F([df_{between}], [df_{within}]) = [X.XX]$, $p = [.XXX]$, $\eta_p^2 = [.XX]$. Post hoc comparisons using the Tukey HSD test indicated that the mean score for $[Group 1]$ ($M = [X.XX]$, $SD = [X.XX]$) was significantly different from $[Group 2]$ ($M = [X.XX]$, $SD = [X.XX]$, $p = [.XXX]$). 

---

## 9. Multiple Linear Regression Template

### Fill-in-the-Blank Template
> A standard multiple linear regression was performed to determine whether $[Predictor 1]$, $[Predictor 2]$, and $[Predictor 3]$ significantly predicted $[Outcome Variable]$. The overall regression model was statistically significant, $F([df_1], [df_2]) = [X.XX]$, $p < .001$, accounting for $[XX.X]\%$ of the variance in $[Outcome Variable]$ ($R^2 = [.XX]$, adjusted $R^2 = [.XX]$). As shown in Table 3, $[Predictor 1]$ was the strongest unique predictor ($\beta = [.XX]$, $t([df]) = [X.XX]$, $p = [.XXX]$), followed by $[Predictor 2]$ ($\beta = [.XX]$, $t([df]) = [X.XX]$, $p = [.XXX]$). 

---

## 10. Official APA 7 Table Formatting Checklist

Follow this layout for any table in your thesis:

```text
Table 1
Descriptive Statistics and Pearson Correlations for Study Variables

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Variable               M       SD      α       1       2       3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Perceived Stress   23.45   5.12    .86      —
2. Sleep Quality      14.20   3.85    .78    -.41**    —
3. Academic GPA        3.42   0.48     —     -.32**   .29*    —
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Note. N = 153. M = mean; SD = standard deviation; α = Cronbach's alpha.
* p < .05. ** p < .01. *** p < .001 (two-tailed).
```

### Table Rules
1. **No Vertical Lines:** Never use vertical gridlines in APA format.
2. **Three Horizontal Borders:**
   - One line above the column headers.
   - One line below the column headers.
   - One line below the last row of data.
3. **Table Title:**
   - The word "Table 1" in **bold**, followed by a line break.
   - The descriptive title in *Italics* with Title Capitalization.
4. **Note:**
   - Placed directly under the table starting with *Note.* (italicized).
   - Spell out abbreviations ($M$, $SD$, $CI$).

---

## 11. Top 7 Thesis Advisor Red Flags & How to Avoid Them

1. 🚫 **Writing $p = .000$:**
   Statistical packages like SPSS print `.000`. In reality, a probability is never zero. Always write $p < .001$.
2. 🚫 **Putting a zero before $p$ ($0.05$ instead of $.05$):**
   This is the #1 easiest giveaway that a student did not read APA 7 rules.
3. 🚫 **Omitting Effect Sizes ($d$ or $\eta_p^2$):**
   Advisors and journals reject papers that report only $p$-values without practical effect sizes.
4. 🚫 **Forgetting Degrees of Freedom:**
   Always include $df$ in parentheses: $t(148)$, $F(2, 147)$, $r(151)$.
5. 🚫 **Using Raw Item Scores Instead of Composite Means/Sums:**
   For validated psychological questionnaires, calculate composite scale scores (mean or sum across items) after reverse-coding negatively worded items.
6. 🚫 **Leaving Default Software Tables:**
   Never take a screenshot of SPSS output or Excel default colored borders and paste it into your thesis. Convert it to clean APA 3-line tables.
7. 🚫 **Failing to Report Internal Reliability:**
   Every multi-item scale used in your thesis must have its Cronbach's alpha reported from *your* actual dataset, not just cited from the original 1980s publication.
