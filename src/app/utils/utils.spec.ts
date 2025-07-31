import { calculateTax } from "./calculation-utils";

// 2024 - 2025
describe('calculateTax', () => {
  it('Year 2024-2025: should return 0 for income $0', () => {
    expect(calculateTax('2024-2025', 0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2024-2025: should return 0 for income $10,000', () => {
    expect(calculateTax('2024-2025', 10000)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2024-2025: should return 3488 for income below $40,000', () => {
    expect(calculateTax('2024-2025', 40000)).toBe(3488);
  });
});

describe('calculateTax', () => {
  it('Year 2024-2025: should return 14788 for income below $80,000', () => {
    expect(calculateTax('2024-2025', 80000)).toBe(14788);
  });
});

describe('calculateTax', () => {
  it('Year 2024-2025: should return 36838 for income below $150,000', () => {
    expect(calculateTax('2024-2025', 150000)).toBe(36838);
  });
});

describe('calculateTax', () => {
  it('Year 2024-2025: should return 60638 for income below $210,000', () => {
    expect(calculateTax('2024-2025', 210000)).toBe(60638);
  });
});

// 2020 - 2024
describe('calculateTax', () => {
  it('Year 2023-2024: should return 0 for income $0', () => {
    expect(calculateTax('2023-2024', 0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2023-2024: should return 0 for income $10,000', () => {
    expect(calculateTax('2023-2024', 10000)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2023-2024: should return 4142 for income below $40,000', () => {
    expect(calculateTax('2023-2024', 40000)).toBe(4142);
  });
});

describe('calculateTax', () => {
  it('Year 2023-2024: should return 16467 for income below $80,000', () => {
    expect(calculateTax('2023-2024', 80000)).toBe(16467);
  });
});

describe('calculateTax', () => {
  it('Year 2023-2024: should return 40567 for income below $150,000', () => {
    expect(calculateTax('2023-2024', 150000)).toBe(40567);
  });
});

describe('calculateTax', () => {
  it('Year 2023-2024: should return 65167 for income below $210,000', () => {
    expect(calculateTax('2023-2024', 210000)).toBe(65167);
  });
});

// 2018 - 2020
describe('calculateTax', () => {
  it('Year 2019-2020: should return 0 for income $0', () => {
    expect(calculateTax('2019-2020', 0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2019-2020: should return 0 for income $10,000', () => {
    expect(calculateTax('2019-2020', 10000)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2019-2020: should return 4547 for income below $40,000', () => {
    expect(calculateTax('2019-2020', 40000)).toBe(4547);
  });
});

describe('calculateTax', () => {
  it('Year 2019-2020: should return 17547 for income below $80,000', () => {
    expect(calculateTax('2019-2020', 80000)).toBe(17547);
  });
});

describe('calculateTax', () => {
  it('Year 2019-2020: should return 42997 for income below $150,000', () => {
    expect(calculateTax('2019-2020', 150000)).toBe(42997);
  });
});

describe('calculateTax', () => {
  it('Year 2019-2020: should return 67597 for income below $210,000', () => {
    expect(calculateTax('2019-2020', 210000)).toBe(67597);
  });
});

// 2016 - 2018
describe('calculateTax', () => {
  it('Year 2016-2017: should return 0 for income $0', () => {
    expect(calculateTax('2016-2017', 0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2016-2017: should return 0 for income $10,000', () => {
    expect(calculateTax('2016-2017', 10000)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2016-2017: should return 4547 for income below $40,000', () => {
    expect(calculateTax('2016-2017', 40000)).toBe(4547);
  });
});

describe('calculateTax', () => {
  it('Year 2016-2017: should return 17547 for income below $80,000', () => {
    expect(calculateTax('2016-2017', 80000)).toBe(17547);
  });
});

describe('calculateTax', () => {
  it('Year 2016-2017: should return 43132 for income below $150,000', () => {
    expect(calculateTax('2016-2017', 150000)).toBe(43132);
  });
});

describe('calculateTax', () => {
  it('Year 2016-2017: should return 67732 for income below $210,000', () => {
    expect(calculateTax('2016-2017', 210000)).toBe(67732);
  });
});

// 2013 - 2016
describe('calculateTax', () => {
  it('Year 2014-2015: should return 0 for income $0', () => {
    expect(calculateTax('2014-2015', 0)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2014-2015: should return 0 for income $10,000', () => {
    expect(calculateTax('2014-2015', 10000)).toBe(0);
  });
});

describe('calculateTax', () => {
  it('Year 2014-2015: should return 4547 for income below $40,000', () => {
    expect(calculateTax('2014-2015', 40000)).toBe(4547);
  });
});

describe('calculateTax', () => {
  it('Year 2014-2015: should return 17547 for income below $80,000', () => {
    expect(calculateTax('2014-2015', 80000)).toBe(17547);
  });
});

describe('calculateTax', () => {
  it('Year 2014-2015: should return 43447 for income below $150,000', () => {
    expect(calculateTax('2014-2015', 150000)).toBe(43447);
  });
});

describe('calculateTax', () => {
  it('Year 2014-2015: should return 68047 for income below $210,000', () => {
    expect(calculateTax('2014-2015', 210000)).toBe(68047);
  });
});