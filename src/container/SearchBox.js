import React from "react";
import Table from "../components/Table";
import InputBox from "../components/Input";
import "./UI.css";

class SearchBox extends React.Component {
  state = {
    link: "",
    isFetching: false,
    totalCount: 0,
    lessThanOneDay: 0,
    lessThanSevenDays: 0,
    moreThanSevenDays: 0,
    errorMessage: "",
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

  fetchData = userNameAndRepoName => {
    const key =
      userNameAndRepoName.charAt(userNameAndRepoName.length - 1) === "/" //Input Validation
        ? userNameAndRepoName.substring(0, userNameAndRepoName.length - 1)
        : userNameAndRepoName;
    let lessThanOneDay = 0;
    let lessThanSevenDays = 0;
    let moreThanSevenDays = 0;
    let totalCount = 0;
    let errorMessage = "";
    this.setState({ isFetching: true });
    console.log({ key });
    fetch(`https://api.github.com/repos/${key}/issues`)
      .then(results => {
        return results.json();
      })
      .then(results => {
        !results.length
          ? (errorMessage = results.message)
          : results.map(issue => {
              const todayTimeStamp = new Date().getTime();
              if (!issue.pull_request) {
                //Check if it's a issue or pull request
                totalCount++;
                const lastOpenedDateTimeStamp = new Date(
                  issue.updated_at
                ).getTime();
                const difference = todayTimeStamp - lastOpenedDateTimeStamp;
                const differenceInDays = Math.floor(
                  difference / (1000 * 60 * 60 * 24)
                );
                if (differenceInDays <= 1) lessThanOneDay++;
                else if (differenceInDays > 1 && differenceInDays < 7)
                  lessThanSevenDays++;
                else moreThanSevenDays++;
              }
            });
        this.setState(
          {
            totalCount,
            lessThanOneDay,
            lessThanSevenDays,
            moreThanSevenDays,
            errorMessage
          },
          () => {
            this.setState({ isFetching: false });
          }
        );
      });
  };
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
