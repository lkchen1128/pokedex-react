import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'

import PokemonCard from './PokemonCard'
import PokemonCardHeader from './PokemonCardHeader'

class PokemonPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    const pokemon = this.props.data.Pokemon

    return (
      <div>
        <PokemonCardHeader pokemon={filter(PokemonCardHeader.fragments.pokemon, pokemon)} />
        <PokemonCard
          pokemon={filter(PokemonCard.fragments.pokemon, pokemon)}
          handleCancel={this.goBack}
          afterChange={this.goBack} />
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const PokemonQuery = gql`query($id: ID!) {
    Pokemon(id: $id) {
      ... PokemonCardPokemon
      ... PokemonCardHeaderPokemon
    }
  }
  ${PokemonCardHeader.fragments.pokemon}
  ${PokemonCard.fragments.pokemon}
`

const PokemonPageWithData = graphql(PokemonQuery, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.params.pokemonId
      }
    })
  }
)(withRouter(PokemonPage))

export default PokemonPageWithData
