import React from "react";
import Table from "../components/Table";
import InputBox from "../components/Input";
import "./UI.css";
import {
  get_issues_before_n_days,
  // get_open_issues,
  get_all_issues
} from "../apiCalls.js/GetIssues";

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
    const lessThanOneDay = await get_issues_before_n_days(1, key);
    const lessThanSevenDays = await get_issues_before_n_days(7, key);
    const totalCount = await get_all_issues(key);
    const moreThanSevenDays = totalCount - lessThanOneDay - lessThanSevenDays;
    this.setState({
      lessThanOneDay,
      lessThanSevenDays,
      moreThanSevenDays,
      totalCount,
      isFetching: false
    });
    const errorMessage = !(lessThanOneDay && lessThanSevenDays && totalCount);
    this.setState({ errorMessage });
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
