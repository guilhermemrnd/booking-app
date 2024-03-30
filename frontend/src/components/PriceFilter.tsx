type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export default function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div className="pb-5">
      <h4 className="text-md mb-2 font-semibold">Max Price</h4>
      <select
        className="w-full border rounded-md p-2 text-sm"
        value={selectedPrice}
        onChange={({ target }) => onChange(target.value ? parseInt(target.value) : undefined)}
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
}
