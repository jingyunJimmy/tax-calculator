export type IncomeYear = 
    '2013-2014' | 
    '2014-2015' |
    '2015-2016' |
    '2016-2017' |
    '2017-2018' |
    '2018-2019' |
    '2019-2020' |
    '2020-2021' |
    '2021-2022' |
    '2022-2023' |
    '2023-2024' |
    '2024-2025'

export interface TaxBracket {
    min: number;
    max?: number;
    baseTax: number;
    rate: number;
}

export const IncomeYearOptions: IncomeYear[] = [
    '2024-2025',
    '2023-2024',
    '2022-2023',
    '2021-2022',
    '2020-2021',
    '2019-2020',
    '2018-2019',
    '2017-2018',
    '2016-2017',
    '2015-2016',
    '2014-2015',
    '2013-2014',
]

export type AmountInputValue = number | null;

export type SelectFinancialYearValue = IncomeYear | null;
