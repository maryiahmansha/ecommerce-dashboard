interface KPIProps {
  title: string;
  value: number | string;
}

const KPI: React.FC<KPIProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold mt-2">{value}</span>
    </div>
  );
};

export default KPI;
