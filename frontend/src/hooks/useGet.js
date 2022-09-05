import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { toast } from "react-toastify";
import { formatParams } from "./useAsyncOptions";
import api from "api";
import _, { isEmpty, isFinite } from "lodash";


export const useGet = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const getData = async (name_api, params = {}) => {
    dispatch(setLoading(true));
    const _params = formatParams({ ...params });

    try {
      const _data = await api.get(name_api, { params: _params });
      setData(_data);
    } catch (e) {
      let msj = "No se pudo obtener los registros";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e[0];
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { data, getData };
};

export default useGet;
