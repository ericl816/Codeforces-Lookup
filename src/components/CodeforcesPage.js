import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Rating from './Rating';
import RatingGraph from './RatingGraph';
import ProblemSection from './ProblemSection'

export default class CodeforcesPage extends Component {
  render() {
    const { handle, firstName, lastName, city, country, organization, rating, maxRating } = (this.props.userInfo || {});
    const { problems, ratings } = this.props;

    let name = '';
    if (firstName) {
      name += firstName + ' ';
    }
    if (lastName) {
      name += lastName + ' ';
    }
    if (city && country) {
      name += 'from ' + city + ', ' + country;
    } else if (city || country) {
      name += 'from ' + (city || country);
    }

    return (
      <Container>
        <Header as='h2'>{handle}</Header>
        <p>{name}</p>
        {organization && <p>{'Affiliated with ' + organization}</p>}
        <Grid stackable columns={2}>
          <Grid.Column width={4}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Rating site='cf' rating={rating} label='Current Rating' />
              <Rating site='cf' rating={maxRating} label='Max Rating' />
            </div>
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <RatingGraph style={{ width: '100%', height: '100%' }} ratings={ratings} />
          </Grid.Column>
        </Grid>
        <ProblemSection problems={problems} />
      </Container>
    )
  }
}
