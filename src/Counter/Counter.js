import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from './Input';

const StyledCounter = styled.div`
  margin-top: 200px;
  font-family: 'Roboto', sans-serif;
`;

const Count = styled.h2`
  text-align: center;
`;

const Counter = (props) => {
  const { count } = props;
  return (
    <StyledCounter>
      <Count>
        {count}
      </Count>
      <Input />
    </StyledCounter>
  );
};

function mapStateToProps(state) {
  return {
    count: state.counter.count,
  };
}

export default connect(mapStateToProps)(Counter);
