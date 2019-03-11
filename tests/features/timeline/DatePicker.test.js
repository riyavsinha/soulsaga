import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DatePicker from 'features/timeline/DatePicker';
import Input from '@material-ui/core/Input';

const NO_YEAR_EROR = 'This field is required';
const INVALID_DATE_HIDDEN_CLASS = 'timeline-date-picker__date-error--hidden';

describe('timeline/DatePicker', () => {
  let onChangeFn;

  beforeEach(() => {
    onChangeFn = jest.fn();
  });

  describe('renders', () => {
    it('renders empty', () => {
      const props = { month: '', day: '', year: '', onChange: onChangeFn };
      const renderedComponent = renderer
        .create(<DatePicker {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('renders with date', () => {
      const props = {
        month: 'January',
        day: '5',
        year: '2010',
        onChange: onChangeFn,
      };
      const renderedComponent = renderer
        .create(<DatePicker {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('renders with invalid date', () => {
      const props = { month: '', day: '5', year: '2010', onChange: onChangeFn };
      const renderedComponent = renderer
        .create(<DatePicker {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('"Year Required" error is shown when no year', () => {
    let props;
    beforeEach(() => {
      props = {
        month: '',
        day: '',
        year: '',
        onChange: onChangeFn,
      };
    });

    it('has empty props', () => {
      const wrapper = mount(<DatePicker {...props} />);

      expect(
        wrapper
          .find('p')
          .first()
          .text(),
      ).toBe(NO_YEAR_EROR);
      expect(
        wrapper
          .find('p')
          .last()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('has month', () => {
      props.month = 'January';
      const wrapper = mount(<DatePicker {...props} />);

      expect(
        wrapper
          .find('p')
          .first()
          .text(),
      ).toBe(NO_YEAR_EROR);
      expect(
        wrapper
          .find('p')
          .last()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('has day', () => {
      props.day = '5';
      const wrapper = mount(<DatePicker {...props} />);

      expect(
        wrapper
          .find('p')
          .first()
          .text(),
      ).toBe(NO_YEAR_EROR);
      expect(
        wrapper
          .find('p')
          .last()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('has month and day', () => {
      props.month = 'January';
      props.day = '5';
      const wrapper = mount(<DatePicker {...props} />);

      expect(
        wrapper
          .find('p')
          .first()
          .text(),
      ).toBe(NO_YEAR_EROR);
      expect(
        wrapper
          .find('p')
          .last()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('hides invalid date error when no year', () => {
      props.month = 'March';
      props.day = '40';
      const wrapper = mount(<DatePicker {...props} />);

      expect(
        wrapper
          .find('p')
          .last()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });
  });

  describe('"Invalid Date" error is shown when bad date', () => {
    let props;
    beforeEach(() => {
      props = {
        month: '',
        day: '',
        year: '2001',
        onChange: onChangeFn,
      };
    });

    it('has day with no month', () => {
      props.day = '4';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(false);
    });

    it('day is too low', () => {
      props.day = '0';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(false);
    });

    it('day is too high', () => {
      props.day = '29';
      props.month = 'February';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(false);
    });
  });

  describe('Valid date shows no errors', () => {
    let props;
    beforeEach(() => {
      props = {
        month: '',
        day: '',
        year: '2000',
        onChange: onChangeFn,
      };
    });

    it('has year', () => {
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('has year and month', () => {
      props.month = 'July';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('has year, month and day', () => {
      props.month = 'July';
      props.day = '31';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });

    it('works on leap days', () => {
      props.month = 'February';
      props.day = '29';
      const wrapper = mount(<DatePicker {...props} />);

      expect(wrapper.find('p')).toHaveLength(1);
      expect(
        wrapper
          .find('p')
          .first()
          .hasClass(INVALID_DATE_HIDDEN_CLASS),
      ).toBe(true);
    });
  });

  describe('Handles events properly', () => {
    it('updates day on change', () => {
      const props = {
        month: 'January',
        day: '5',
        year: '2010',
        onChange: onChangeFn,
      };
      const wrapper = mount(<DatePicker {...props} />);

      wrapper
        .find('input')
        .at(1)
        .simulate('change', { target: { value: '1' } });

      expect(onChangeFn.mock.calls.length).toBe(1);
      expect(onChangeFn.mock.calls[0]).toMatchObject([
        'January',
        '1',
        '2010',
        true,
      ]);
    });

    it('updates year on change', () => {
      const props = {
        month: 'January',
        day: '5',
        year: '2010',
        onChange: onChangeFn,
      };
      const wrapper = mount(<DatePicker {...props} />);

      wrapper
        .find('input')
        .at(2)
        .simulate('change', { target: { value: '2012' } });

      expect(onChangeFn.mock.calls.length).toBe(1);
      expect(onChangeFn.mock.calls[0]).toMatchObject([
        'January',
        '5',
        '2012',
        true,
      ]);
    });

    it('updates month on change', () => {
      const props = {
        month: 'January',
        day: '5',
        year: '2010',
        onChange: onChangeFn,
      };
      const wrapper = mount(<DatePicker {...props} />);

      // Open menu
      wrapper.find('[role="button"]').simulate('click');
      // Click menu option
      wrapper
        .find('[data-value="August"]')
        .first()
        .simulate('click');

      expect(onChangeFn.mock.calls.length).toBe(1);
      expect(onChangeFn.mock.calls[0]).toMatchObject([
        'August',
        '5',
        '2010',
        true,
      ]);
    });
  });
});
