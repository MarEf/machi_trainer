const Home = () => {
    return (
        <div className="welcome">
            <h2>Welcome to Machi Trainer!</h2>
            <p>Complete challenges to train up your memory on mahjong waits!
                Each challenge will present you with an incomplete mahjong hand and to clear the challenge,
                you must select all possible tiles that reduce shanten, that is, bring the hand closer to completion.
                This trainer is not about optimizing points. Just winning without furiten.
            </p>
            <p>Also, please note that this trainer is specifically for Japanese Mahjong, so it does not include jokers, flowers, or seasons in its tileset.</p>
            <p>The challenge has two modes. In <span className="bold">simple mode</span>, the hands presented are sorted by type with honors at the end.
                In <span className="bold">scrambled mode</span>, the tiles in the hands are scrambled and it will be harder to know what
                you&apos;re waiting for, but not sorting your hand has an added benefit of being harder for other players to predict.
            </p>
            <p>Now, without further ado, please choose your challenge mode and get problem solving!</p>
        </div>
    )
}

export default Home