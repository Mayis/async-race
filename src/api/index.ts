import ApiSlice from "@/api/slice";
import EngineSlice from "@/api/slices/engine";
import GarageSlice from "@/api/slices/garage";
import WinnersSlice from "@/api/slices/winners";

class Api extends ApiSlice {
  static garage = GarageSlice;
  static winners = WinnersSlice;
  static engine = EngineSlice;
}

export default Api;
