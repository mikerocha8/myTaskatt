describe('Not method', () => {
  it('usbo basico - not', () => {
    expect(1 + 1).not.toEqual(1);
  });
});

describe('Match - expressoes regulares', () => {
  it('usbo basico - toMatch', () => {
    expect('developer').toMatch(/\w+/);
  });
});

export {};
