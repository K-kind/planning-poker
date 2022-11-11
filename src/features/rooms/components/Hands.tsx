type Props = {
  cards: number[];
  selectedCard: number | null;
  loading?: boolean;
  onSelect: (card: number | null) => void;
};

export const Hands = ({ cards, selectedCard, loading, onSelect }: Props) => {
  return (
    <div>
      {cards.map((card) => (
        <span
          key={card}
          onClick={() => onSelect(card)}
          style={{
            color: selectedCard === card ? "red" : undefined,
            opacity: loading ? 0.5 : undefined,
          }}
        >
          {card}
        </span>
      ))}
    </div>
  );
};
