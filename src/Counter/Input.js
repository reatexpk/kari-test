import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  margin-right: 5px;
`;
const StyledButton = styled.button`
  margin-left: 5px;
  width: 70px;
`;
const Error = styled.p`
  margin-top: 5px;
  color: red;
  text-align: center;
`;

class Input extends React.Component {
  state = {
    inputValue: 0,
    hasErrored: false,
    counterId: null,
  };

  handleClick = () => {
    const { incrementToStore, decrementToStore } = this.props;
    const { inputValue, counterId } = this.state;
    if (counterId === null) {
      const currentCounterId = setInterval(() => {
        const { counterId: _counterId } = this.state;
        const { count } = this.props;
        if (inputValue > count) incrementToStore();
        if (inputValue < count) decrementToStore();
        if (inputValue === count) {
          this.setState(
            {
              counterId: null,
            },
            clearInterval(_counterId),
          );
        }
      }, 30);
      this.setState({
        counterId: currentCounterId,
      });
    } else {
      this.setState(
        {
          counterId: null,
        },
        clearInterval(counterId),
      );
    }
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
      inputValue: value,
    });
  };

  render() {
    const { hasErrored, counterId } = this.state;
    return (
      <React.Fragment>
        <Container>
          <StyledInput type="text" onChange={this.handleChange} />
          {hasErrored && (
          <StyledButton disabled>
            {counterId ? 'STOP' : 'START'}
          </StyledButton>
          )}
          {hasErrored || (
            <StyledButton type="button" onClick={this.handleClick}>
              {counterId ? 'STOP' : 'START'}
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

function mapStateToProps(state) {
  return {
    count: state.counter.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementToStore: (count) => {
      dispatch(increment(count));
    },
    decrementToStore: (count) => {
      dispatch(decrement(count));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
