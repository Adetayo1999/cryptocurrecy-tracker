import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cryptoAPI } from "../../api/crypto.api";

type CryptoResponseStateTimeStatistics = {
  volume: string;
  price_change: string;
  price_change_pct: string;
  volume_change: string;
  volume_change_pct: string;
  market_cap_change: string;
  market_cap_change_pct: string;
};

type CryptoResponseState = {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  status: string;
  price: string;
  circulating_supply: string;
  max_supply: string;
  market_cap: string;
  rank: string;
  "1d": CryptoResponseStateTimeStatistics;
  "7d": CryptoResponseStateTimeStatistics;
  "30d": CryptoResponseStateTimeStatistics;
  "365d": CryptoResponseStateTimeStatistics;
  ytd: CryptoResponseStateTimeStatistics;
};

type initialStateType = {
  loadingCrypto: boolean;
  cryptoError: string;
  crypto: CryptoResponseState[];
};

const initialState: initialStateType = {
  loadingCrypto: false,
  cryptoError: "",
  crypto: [],
};

export const fetchCryptos = createAsyncThunk(
  "crypto/fetchCryptos",
  async () => {
    const response = await cryptoAPI();
    return response.data;
  }
);

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(fetchCryptos.pending, (state) => {
      state.loadingCrypto = true;
    });
    builders.addCase(
      fetchCryptos.fulfilled,
      (state, action: PayloadAction<CryptoResponseState[]>) => {
        state.cryptoError = "";
        state.crypto = action.payload;
        state.loadingCrypto = false;
      }
    );
    builders.addCase(fetchCryptos.rejected, (state, action) => {
      let message = "Unknown Error";
      if (action.payload instanceof Error) {
        message = action.payload.message;
      }
      state.cryptoError = message;
      state.crypto = [];
      state.loadingCrypto = false;
    });
  },
});

export default cryptoSlice.reducer;
