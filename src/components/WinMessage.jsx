export const WinMessage = ({ moves }) => {
    return (
        <div className="win-message">
            <h2>Congrast !</h2>
            <p>You complete the game in {moves} moves .</p>
        </div>
    )
}