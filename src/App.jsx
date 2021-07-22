import React, { useState } from 'react'
import api from './Services/api'
import Spinner from './Components/Spinner/index'
import * as S from './Styles/style'
import GlobalStyled from './Styles/global'
import pokeball from './Assets/pokeball.svg'

const App = () => {
    const [pokemon, setPokemon] = useState(null)
    const [typedPokemon, setTypedPokemon] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        setTypedPokemon(event.target.value.toLowerCase())
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!typedPokemon) {
            return
        }
        setIsLoading(true)
        try {
            const response = await api.get(`pokemon/${typedPokemon}`)
            setPokemon(response.data)
            console.log(setPokemon(response.data))
            setError(null)
            setIsLoading(false)
        } catch (error) {
            setError('Pokemon não encontrado')
            setPokemon(null)
            setIsLoading(false)
        }
    }


    return (
        <S.Wrapper>
            <S.Welcome>Seja Bem-Vindo a Pokedex </S.Welcome>
            <S.Instructions>
                Digite o nome do Pokemon começar
            </S.Instructions>
            <S.Form action="" onSubmit={handleSubmit} >
                <S.Input type="text"
                    value = {typedPokemon} 
                    placeholder="Nome do Pokemon"
                    onChange= {handleChange}
                     />
                <S.Button type="submit">
                    {isLoading ?(
                        <span>Carreagando...</span>) :
                        (
                            <>
                            Buscar <img src={pokeball} alt="pokeball" />{' '}
                            </>
                    )}
                </S.Button>
            </S.Form>
            {error && <span>{error}</span>}
            {pokemon && (
                <S.PokemonCard key={pokemon.id}>
                    { isLoading ? (
                        <Spinner/>
                    ) : (
                        <>
                            <S.AvatarWrapper>
                                <S.PokemonName>{pokemon.name} </S.PokemonName>
                                <S.Avatar 
                                    src = {pokemon.sprites['front_default']}
                                    alt = {pokemon.name}
                                />
                            </S.AvatarWrapper>
                            <S.PokemonDetails>
                                <span>
                                    <strong>Height</strong>: {pokemon.height * 10} cm
                                </span>
                                <span>
                                    <strong>Weight</strong>: {pokemon.weight / 10} Kg
                                </span>
                                <span>
                                    <strong>Type</strong>: {pokemon.types[0].type.name}
                                </span>
                                <span>
                                    <strong>Id</strong>: {pokemon.id}
                                </span>
                            </S.PokemonDetails>
                        </>
                    )

                    }
                </S.PokemonCard>

            )}
            <GlobalStyled/>
        </S.Wrapper>
    )
}

export default App