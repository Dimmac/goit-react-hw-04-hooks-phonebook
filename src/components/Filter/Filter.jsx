import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { LabelFilterStyle, InputFilterStyle } from './Filter.styled';

const generateId = nanoid();

export const Filter = ({ value, onChange }) => {
  return (
    <LabelFilterStyle htmlFor={generateId}>
      Find contacts by name
      <InputFilterStyle
        type="text"
        name="filter"
        autoComplete="off"
        value={value}
        onChange={onChange}
        id={generateId}
      />
    </LabelFilterStyle>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};