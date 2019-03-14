import Downshift from 'downshift';
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TagInput from 'features/timeline/TagInput';

const MENU_CLASS = '.timeline-tag-input__autocomplete-menu';

describe('timeline/TagInput', () => {
  let props;
  let onChangeFn;

  beforeEach(() => {
    onChangeFn = jest.fn();
    props = {
      availableTags: [],
      eventTags: [],
      onChange: onChangeFn,
    };
  });

  describe('snapshot tests', () => {
    it('renders empty', () => {
      const renderedComponent = renderer
        .create(<TagInput {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('renders with tags and available tags, available tags hidden', () => {
      props.availableTags = ['testAvailableTag1', 'testAvailableTag2'];
      props.eventTags = ['testEventTag1', 'testEventTag2'];
      const renderedComponent = renderer
        .create(<TagInput {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('Chip list tests', () => {
    it('renders number of chips in eventTags', () => {
      props.eventTags = ['testEventTag1', 'testEventTag2'];

      const wrapper = mount(<TagInput {...props} />);

      expect(wrapper.find('Chip')).toHaveLength(2);
    })

    it('deletes tag when chip delete icon clicked', () => {
      props.eventTags = ['testEventTag1', 'testEventTag2'];

      const wrapper = mount(<TagInput {...props} />);

      expect(wrapper.find('Chip').first().find('svg')).toHaveLength(1);
      wrapper.find('Chip').first().find('svg').simulate('click');

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn).toHaveBeenLastCalledWith(['testEventTag2']);
    })
  })

  describe('Input tests', () => {
    it('enters text on normal letter presses', () => {
      const wrapper = mount(<TagInput {...props} />);

      wrapper.find('input').simulate('change', { target: { value: 'ea' } });

      expect(wrapper.state().inputValue).toBe('ea');
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it('clears input and adds unique tag when comma entered', () => {
      const wrapper = mount(<TagInput {...props} />);

      wrapper.find('input').simulate('change', { target: { value: 'ea,' } });

      expect(wrapper.state().inputValue).toBe('');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn).toHaveBeenLastCalledWith(['ea']);
    });

    it('appends new tag to existing tags', () => {
      props.eventTags = ['work', 'beach']
      const wrapper = mount(<TagInput {...props} />);

      wrapper.find('input').simulate('change', { target: { value: 'food,' } });

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn).toHaveBeenLastCalledWith(['work', 'beach', 'food']);
    });

    it('clears input when comma entered, non-unique tag not added', () => {
      props.eventTags = ['ea'];
      const wrapper = mount(<TagInput {...props} />);

      wrapper.find('input').simulate('change', { target: { value: 'ea,' } });

      expect(wrapper.state().inputValue).toBe('');
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it('adds tag when enter clicked', () => {
      const wrapper = mount(<TagInput {...props} />);

      wrapper.find('input').simulate('change', { target: { value: 'ea' } });
      wrapper.find('input').simulate('keydown', { key: 'Enter' });

      expect(wrapper.state().inputValue).toBe('');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn).toHaveBeenLastCalledWith(['ea']);
    });
  });

  describe('Menu tests', () => {
    it('toggles suggestion menu on input click', () => {
      props.availableTags = ['eat']
      
      const wrapper = mount(<TagInput {...props} />);
      expect(wrapper.find(MENU_CLASS).length).toBeFalsy();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(MENU_CLASS).length).toBeTruthy();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(MENU_CLASS).length).toBeFalsy();
    });

    it('does not open when no suggestions available', () => {      
      const wrapper = mount(<TagInput {...props} />);
      expect(wrapper.find(MENU_CLASS).length).toBeFalsy();

      wrapper.find('input').simulate('click');
      expect(wrapper.find(MENU_CLASS).length).toBeFalsy();
    });

    it('renders suggestions that input value is subset of when strings normalized', () => {
      props.availableTags = ['eat', 'béach', 'flEa', 'new york', 'work'];

      const wrapper = mount(<TagInput {...props} />);
      wrapper.find('input').simulate('change', {target: {value: 'ea'}});

      const menuItemsWrapper = wrapper.find('MenuItem');
      expect(menuItemsWrapper).toHaveLength(3);
      expect(menuItemsWrapper.at(0).text()).toBe('eat');
      expect(menuItemsWrapper.at(1).text()).toBe('béach');
      expect(menuItemsWrapper.at(2).text()).toBe('flEa');
    });

    it('adds menu item to tags when clicked', () => {
      props.availableTags = ['work'];

      const wrapper = mount(<TagInput {...props} />);
      wrapper.find('input').simulate('click');

      const menuItemsWrapper = wrapper.find('MenuItem').simulate('click');

      expect(onChangeFn).toHaveBeenCalledTimes(1);
      expect(onChangeFn).toHaveBeenLastCalledWith(['work']);
    });
  });
});
