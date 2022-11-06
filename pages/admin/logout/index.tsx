import { useMutation } from "@tanstack/react-query";
import Router from "next/router";
import { useEffect } from "react";
import { removeStorage } from "../../../utils/storage";

import { logoutAdminAPI } from './api';

export default function Logout() {
  const route = Router;
  const { mutate: logoutAdmin, isLoading } = useMutation(logoutAdminAPI, {
    onSuccess: data => {
      if (data.status === 200) {
        console.log({ data });
        removeStorage('admin/session');
        route.push('/admin/login');
      }
    }
  });

  useEffect(() => {
    logoutAdmin();
  }, []);

  if (isLoading) return <span>Loading...</span>;
  return null;
}