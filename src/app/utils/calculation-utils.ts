import { IncomeYear, TaxBracket } from "../interfaces";

const taxBrackets2024_25: TaxBracket[] = [
    { min: 0, max: 18200, baseTax: 0, rate: 0 },
    { min: 18200, max: 45000, baseTax: 0, rate: 0.16 },
    { min: 45000, max: 135000, baseTax: 4288, rate: 0.30 },
    { min: 135000, max: 190000, baseTax: 31288, rate: 0.37 },
    { min: 190000, baseTax: 51638, rate: 0.45 },
];

const taxBrackets2020_24: TaxBracket[] = [
    { min: 0, max: 18200, baseTax: 0, rate: 0 },
    { min: 18200, max: 45000, baseTax: 0, rate: 0.19 },
    { min: 45000, max: 120000, baseTax: 5092, rate: 0.325 },
    { min: 120000, max: 180000, baseTax: 29467, rate: 0.37 },
    { min: 180000, baseTax: 51667, rate: 0.45 },
];

const taxBrackets2018_20: TaxBracket[] = [
    { min: 0, max: 18200, baseTax: 0, rate: 0 },
    { min: 18200, max: 37000, baseTax: 0, rate: 0.19 },
    { min: 37000, max: 90000, baseTax: 3572, rate: 0.325 },
    { min: 90000, max: 180000, baseTax: 20797, rate: 0.37 },
    { min: 180000, baseTax: 54097, rate: 0.45 },
];

const taxBrackets2016_18: TaxBracket[] = [
    { min: 0, max: 18200, baseTax: 0, rate: 0 },
    { min: 18200, max: 37000, baseTax: 0, rate: 0.19 },
    { min: 37000, max: 87000, baseTax: 3572, rate: 0.325 },
    { min: 87000, max: 180000, baseTax: 19822, rate: 0.37 },
    { min: 180000, baseTax: 54232, rate: 0.45 },
];

const taxBrackets2013_16: TaxBracket[] = [
    { min: 0, max: 18200, baseTax: 0, rate: 0 },
    { min: 18200, max: 37000, baseTax: 0, rate: 0.19 },
    { min: 37000, max: 80000, baseTax: 3572, rate: 0.325 },
    { min: 80000, max: 180000, baseTax: 17547, rate: 0.37 },
    { min: 180000, baseTax: 54547, rate: 0.45 },
];

export const calculateTax = (incomeYear: IncomeYear, taxableIncome: number): number => {
    switch (incomeYear) {
        case '2013-2014':
        case "2014-2015":
        case "2015-2016":
            return calculateTaxFn(taxableIncome, taxBrackets2013_16);
        case "2016-2017":
        case "2017-2018":
            return calculateTaxFn(taxableIncome, taxBrackets2016_18);
        case "2018-2019":
        case "2019-2020":
            return calculateTaxFn(taxableIncome, taxBrackets2018_20);
        case "2020-2021":
        case "2021-2022":
        case "2022-2023":
        case "2023-2024":
            return calculateTaxFn(taxableIncome, taxBrackets2020_24);
        case '2024-2025':
            return calculateTaxFn(taxableIncome, taxBrackets2024_25);
        default: 
            return 0;
    }
}

const calculateTaxFn = (taxableIncome: number, taxBrackets: TaxBracket[]): number =>  {
    for (let i = taxBrackets.length - 1; i >= 0; i--) {
      const bracket = taxBrackets[i];
      if (taxableIncome > bracket.min) {
        const incomeAbove = taxableIncome - bracket.min;
        return bracket.baseTax + incomeAbove * bracket.rate;
      }
    }
    return 0;
}