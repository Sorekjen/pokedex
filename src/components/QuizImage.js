import '../css/quizImage.css'

function QuizImage({ difficulty, id, reveal }) {
    return (
        <>
            <div className='quizimage-container'>
                {reveal ?
                    <img className={`${"easy"}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="pokemon" />

                    :

                    <img
                        className={reveal ? `easy` : `${difficulty}` }
                        style={{ rotate: difficulty === "expert" ? `${Math.random() * 360}deg` : "" }}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        alt="pokemon"
                    />
                }
            </div>
        </>
    );
}

export default QuizImage;
