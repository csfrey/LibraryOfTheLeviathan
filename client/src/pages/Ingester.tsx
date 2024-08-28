import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ingester = () => {
  const navigate = useNavigate();
  const { user, isPending } = useAuth();

  useEffect(() => {
    if (
      (!isPending && !user) ||
      (user?.role !== "editor" && user?.role !== "admin")
    ) {
      navigate("/not-authorized");
    }
  }, [user]);

  return <div>Ingester</div>;
};

export default Ingester;
