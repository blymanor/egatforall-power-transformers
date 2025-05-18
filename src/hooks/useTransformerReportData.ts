
interface ChartData {
  name: string;
  value: number;
  color: string;
}

export const useTransformerReportData = (groupBy: string) => {
  const regionData: ChartData[] = [
    { name: 'ภาคเหนือ', value: 25, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 35, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 30, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 10, color: '#FF8042' },
  ];
  
  const stationData: ChartData[] = [
    { name: 'สถานี 1', value: 15, color: '#0088FE' },
    { name: 'สถานี 2', value: 12, color: '#00C49F' },
    { name: 'สถานี 3', value: 18, color: '#FFBB28' },
    { name: 'สถานี 4', value: 22, color: '#FF8042' },
    { name: 'สถานี 5', value: 10, color: '#8884d8' },
    { name: 'สถานี 6', value: 13, color: '#82ca9d' },
  ];
  
  const manufacturerData: ChartData[] = [
    { name: 'ABB', value: 28, color: '#0088FE' },
    { name: 'Siemens', value: 22, color: '#00C49F' },
    { name: 'Mitsubishi', value: 18, color: '#FFBB28' },
    { name: 'Hitachi', value: 15, color: '#FF8042' },
    { name: 'OSAKA', value: 10, color: '#8884d8' },
    { name: 'อื่นๆ', value: 7, color: '#82ca9d' },
  ];
  
  const ageData: ChartData[] = [
    { name: '0-5 ปี', value: 20, color: '#0088FE' },
    { name: '6-10 ปี', value: 25, color: '#00C49F' },
    { name: '11-15 ปี', value: 35, color: '#FFBB28' },
    { name: '16-20 ปี', value: 15, color: '#FF8042' },
    { name: '21+ ปี', value: 5, color: '#8884d8' },
  ];

  const getReportData = () => {
    switch (groupBy) {
      case "region": return regionData;
      case "station": return stationData;
      case "manufacturer": return manufacturerData;
      case "age": return ageData;
      default: return regionData;
    }
  };
  
  const getGroupByLabel = () => {
    switch (groupBy) {
      case "region": return "เขต";
      case "station": return "สถานีไฟฟ้า";
      case "manufacturer": return "บริษัทผู้ผลิต";
      case "age": return "อายุการใช้งาน";
      default: return "เขต";
    }
  };

  return {
    reportData: getReportData(),
    groupByLabel: getGroupByLabel()
  };
};

export default useTransformerReportData;
