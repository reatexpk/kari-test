import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import addCount from './actions';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  margin-right: 5px;
`;
const StyledButton = styled.button`
  margin-left: 5px;
`;
const Error = styled.p`
  margin-top: 5px;
  color: red;
  text-align: center;
`;

class Input extends React.Component {
  state = {
    count: 0,
    hasErrored: false,
  };

  handleClick = () => {
    const { count } = this.state;
    const { addCountToStore } = this.props;
    addCountToStore(count);
  };

  handleChange = (e) => {
    const value = +e.target.value;
    if (parseInt(value, 10) !== value && value !== 0) {
      this.setState({
        hasErrored: true,
      });
    } else {
      this.setState({
        hasErrored: false,
      });
    }
    this.setState({
      count: value,
    });
  };

  render() {
    const { hasErrored } = this.state;
    return (
      <React.Fragment>
        <Container>
          <StyledInput type="text" onChange={this.handleChange} />
          {hasErrored && (
          <StyledButton disabled>
GO
          </StyledButton>
          )}
          {hasErrored || (
            <StyledButton type="button" onClick={this.handleClick}>
              GO
            </StyledButton>
          )}
        </Container>
        {hasErrored && (
        <Error>
You must specify a number
        </Error>
        )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCountToStore: (count) => {
      dispatch(addCount(count));
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Input);
