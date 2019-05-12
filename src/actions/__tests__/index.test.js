import * as actions from '../index';

describe('actions', () => {
  it('should create an action to set new font size', () => {
    const fontSize = 20;
    const expectedAction = {
      type: 'SET_FONTSIZE',
      fontSize
    }
    expect(actions.setFontSize(fontSize)).toEqual(expectedAction)
  });
});