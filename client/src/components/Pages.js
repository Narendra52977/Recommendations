import React from "react";
import { Route, Routes , Navigate} from "react-router-dom";
import CreateRecommendation from "./CreateRecommendation";
import Recommendations from "./Recommendations";
import Register from "./Register";
export default function Pages() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/user/register" />}/>
        <Route path="/user/register" element={<Register />} />
        <Route
          path="/recommendation"
          exact
          element={<CreateRecommendation />}
        />
        <Route path="/recommendations" exact element={<Recommendations />} />
      </Routes>
    </div>
  );
}
