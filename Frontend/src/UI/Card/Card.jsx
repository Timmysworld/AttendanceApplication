import classes from "../Card/Card.module.css"
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <>
      <div className={classes.card}>{props.children}</div>
    </>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
