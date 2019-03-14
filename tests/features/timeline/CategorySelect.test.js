import CategorySelect from 'features/timeline/CategorySelect';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('timeline/CategorySelect', () => {
  let onChangeFn;

  beforeEach(() => {
    onChangeFn = jest.fn();
  });

  describe('snapshot tests', () => {
    it('renders with selection selected', () => {
      const renderedComponent = renderer
        .create(<CategorySelect category="Fitness" onChange={onChangeFn} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('renders with "other" selected', () => {
      const renderedComponent = renderer
        .create(<CategorySelect category="Other" onChange={onChangeFn} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });
  });

  it('calls onChange when menu item clicked', () => {
    const wrapper = mount(<CategorySelect category="Other" onChange={onChangeFn}/>);

    // Open menu
    wrapper.find('[role="button"]').simulate('click');
    // Click menu option
    wrapper
      .find('[data-value="Fitness"]')
      .first()
      .simulate('click');
    
    expect(onChangeFn.mock.calls.length).toBe(1);
    expect(onChangeFn.mock.calls[0][0].target.value).toBe("Fitness");
  });
});
