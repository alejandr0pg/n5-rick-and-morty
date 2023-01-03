import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";

const useTableHook = () => {
  const { t } = useTranslation("global");
  const { data, loading } = useFetch(
    "https://rickandmortyapi.com/api/character"
  );

  const columns = [
    {
      title: t("table.image"),
      dataIndex: "avatar",
      key: "avatar",
      width: "68px",
    },
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender",
    },
  ];

  const getAvatar = (data) => (
    <img width={64} src={data.image} alt={data.name} />
  );

  const formatData = () => {
    if (!data) return [];

    return data.results.map((item) => {
      const { apodo, name, gender } = item;

      return {
        name,
        apodo,
        gender: t(`genders.${gender}`),
        avatar: getAvatar(item),
      };
    });
  };

  return {
    loading,
    columns,
    data: formatData(),
  };
};

export default useTableHook;
