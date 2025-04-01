const AuctionCard = ({ auction, showClosed }) => {
    return (
        <div key={auction.id} className="auction-card">
            <div className="image-placeholder">Bild</div>
            <p>
                <strong className="card-title">{auction.title}</strong>
            </p>
            <p className="item-price">
                <strong>Utropspris:</strong> {auction.price} kr
            </p>
            {auction.description && (
                <p>
                    <strong>Beskrivning:</strong> {auction.description}
                </p>
            )}
            {auction.endDate && (
                <p>
                    <strong>Slut:</strong>{" "}
                    {new Date(auction.endDate).toLocaleString("sv-SE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            )}
            {auction.createdBy && (
                <p>
                    <strong>Skapad av:</strong> {auction.createdBy}
                </p>
            )}
            {!showClosed && <button className="bid-btn">Lägg bud nu!</button>}
        </div>
    )
}

export default AuctionCard;