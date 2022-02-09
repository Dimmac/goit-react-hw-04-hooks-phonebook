import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import { ListStyle } from './ContactList.styled';

export const ContactList = ({visibleContact,onDeleteContact}) => {
  return (
    <ListStyle>
      {visibleContact.map((data,id) => {
        return (
          <ContactListItem key={id} data={data} onDeleteContact={onDeleteContact} />
        );
      })}
    </ListStyle>
  );
};
ContactList.propTypes = {
  visibleContact: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.string.isRequired})),
  onDeleteContact: PropTypes.func.isRequired,
  
};
