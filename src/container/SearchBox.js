import React from "react";
import { get_open_issues } from "../apiCalls.js/GetIssues";
import InputBox from "../components/Input";
import Table from "../components/Table";
import "./UI.css";

class SearchBox extends React.Component {
  state = {
    link: "",
    isFetching: false,
    totalCount: undefined,
    lessThanOneDay: undefined,
    lessThanSevenDays: undefined,
    moreThanSevenDays: undefined,
    error: false,
    hasBeenClicked: false
  };
  handleInputChange = link => {
    this.setState({ link });
  };

  handleSubmission = () => {
    const { link } = this.state;
    this.setState({ hasBeenClicked: true });
    const userNameAndRepoName = link.split("github.com/").pop();
    this.fetchData(userNameAndRepoName);
  };

  async fetchData(userNameAndRepoName) {
    const key =
      userNameAndRepoName.charAt(userNameAndRepoName.length - 1) === "/" //Input Validation
        ? userNameAndRepoName.substring(0, userNameAndRepoName.length - 1)
        : userNameAndRepoName;
    this.setState({ isFetching: true });
    const {
      lessThanOneDay,
      lessThanSevenDays,
      moreThanSevenDays,
      totalCount,
      error
    } = await get_open_issues(key);
    this.setState({
      lessThanOneDay,
      lessThanSevenDays,
      moreThanSevenDays,
      totalCount,
      errorMessage: error,
      isFetching: false
    });
  }
  render() {
    const {
      link,
      isFetching,
      lessThanOneDay,
      lessThanSevenDays,
      moreThanSevenDays,
      errorMessage,
      totalCount,
      hasBeenClicked
    } = this.state;
    return (
      <div className="container">
        <InputBox
          handleInputChange={this.handleInputChange}
          handleSubmission={this.handleSubmission}
          link={link}
        />
        <Table
          isFetching={isFetching}
          lessThanOneDay={lessThanOneDay}
          lessThanSevenDays={lessThanSevenDays}
          moreThanSevenDays={moreThanSevenDays}
          errorMessage={errorMessage}
          totalCount={totalCount}
          hasBeenClicked={hasBeenClicked}
        />
      </div>
    );
  }
}
export default SearchBox;
