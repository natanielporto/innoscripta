import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { newsAPIQuery, newYorkTimesAPIQuery, theGuardianAPIQuery } from "../utils/queries";
import { CombinedNewsProps, NytProps, TheGuardianProps, TheNewsProps } from "./interfaces";
import { debounce } from "lodash";

interface GlobalContextData {
  loading: boolean;
  theNews: TheNewsProps[],
  nyt: NytProps[],
  theGuardian: TheGuardianProps[],
  fullArticles: CombinedNewsProps[],
  filteredResults: CombinedNewsProps[],
  search: string;
  setSearch: (value: string) => void
  setPersonalizeBy: (value: string) => void
}

interface State {
  theNews: TheNewsProps[];
  nyt: NytProps[];
  theGuardian: TheGuardianProps[];
  fullArticles: CombinedNewsProps[];
  filteredResults: CombinedNewsProps[];
  search: string;
  personalizeBy: string;
}

export const GlobalContext = createContext<GlobalContextData>(
  {} as GlobalContextData
);

const initialState: State = {
  theNews: [],
  nyt: [],
  theGuardian: [],
  fullArticles: [],
  filteredResults: [],
  search: '',
  personalizeBy: 'none',
};

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>(initialState);
  const { search, personalizeBy, fullArticles } = state;

  const newsAPI = useQuery({ queryKey: ['newsAPI'], queryFn: newsAPIQuery });
  const nytAPI = useQuery({ queryKey: ['nytAPI'], queryFn: newYorkTimesAPIQuery });
  const theGuardianAPI = useQuery({ queryKey: ['theGuardianAPI'], queryFn: theGuardianAPIQuery });

  const { data: newsData, isSuccess: newsSuccess } = newsAPI;
  const { data: nytData, isSuccess: nytSuccess } = nytAPI;
  const { data: guardianData, isSuccess: guardianSuccess } = theGuardianAPI;

  useEffect(() => {
    if (newsSuccess && nytSuccess && guardianSuccess) {
      const allArticles = [
        ...(newsData?.articles || []),
        ...(nytData?.results || []),
        ...(guardianData?.response?.results || [])
      ];
      setState((prevState) => ({
        ...prevState,
        fullArticles: allArticles.sort(() => 0.5 - Math.random()),
        filteredResults: allArticles.sort(() => 0.5 - Math.random())
      }));
    }
  }, [newsSuccess, newsData, nytSuccess, nytData, guardianSuccess, guardianData]);

  useEffect(() => {
    if (newsSuccess) setState((prevState) => ({ ...prevState, theNews: newsData?.articles }));
  }, [newsSuccess, newsData]);

  useEffect(() => {
    if (nytSuccess) setState((prevState) => ({ ...prevState, nyt: nytData?.results }));
  }, [nytSuccess, nytData]);

  useEffect(() => {
    if (guardianSuccess) setState((prevState) => ({ ...prevState, theGuardian: guardianData?.response.results }));
  }, [guardianSuccess, guardianData]);

  useEffect(() => {
    const filterBySearch = debounce((search: string) => {
      if (!search) {
        setState((prevState) => ({ ...prevState, filteredResults: fullArticles }));
        return;
      }

      const searchToLowercase = search.toLowerCase();
      const data: any[] = [];
      fullArticles.forEach((item) => {
        if (item) {
          const itemValues = Object.values(item).filter(value => typeof value === 'string') as string[];
          const matches = itemValues.filter(value => value.toLowerCase().includes(searchToLowercase));
          if (matches.length > 0) {
            data.push(item);
          }
        }
      });
      setState((prevState) => ({ ...prevState, filteredResults: data }));
    }, 100);

    filterBySearch(search);
  }, [search, fullArticles]);

  useEffect(() => {
    const personalizeByType = (category: string) => {
      const PERSONALIZE_TYPES = {
        SOURCE: "source",
        CATEGORIES: "categories",
        AUTHORS: "authors",
        NONE: "none"
      };

      switch (category) {
        case PERSONALIZE_TYPES.SOURCE: {
          const result = fullArticles
            .filter((item) => item?.source?.name || item.source || item.webUrl.split('.')[1])
            .sort((a, b) => {
              const nameA = (a.source?.name || a.source || "").toLowerCase();
              const nameB = (b.source?.name || b.source || "").toLowerCase();
              return nameA.localeCompare(nameB);
            });
          setState((prevState) => ({ ...prevState, filteredResults: result }));
          break;
        }
        case PERSONALIZE_TYPES.CATEGORIES: {
          const result = fullArticles
            .filter((item) => item.nytdsection || item.sectionName)
            .sort((a, b) => {
              const nameA = (a.nytdsection || a.sectionName || "").toLowerCase();
              const nameB = (b.nytdsection || b.sectionName || "").toLowerCase();
              return nameA.localeCompare(nameB);
            });
          setState((prevState) => ({ ...prevState, filteredResults: result }));
          break;
        }
        case PERSONALIZE_TYPES.AUTHORS: {
          const result = fullArticles
            .filter((item) => item.author || item.byline)
            .sort((a, b) => {
              const nameA = (a.author || a.byline || "").toLowerCase();
              const nameB = (b.author || b.byline || "").toLowerCase();
              return nameA.localeCompare(nameB);
            });
          setState((prevState) => ({ ...prevState, filteredResults: result }));
          break;
        }
        case PERSONALIZE_TYPES.NONE: {
          setState((prevState) => ({ ...prevState, filteredResults: fullArticles }));
          break;
        }
        default:
          break;
      }
    }

    personalizeByType(personalizeBy);
  }, [personalizeBy, fullArticles]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        loading: newsAPI.isLoading || nytAPI.isLoading || theGuardianAPI.isLoading,
        setSearch: (value: string) => setState((prevState) => ({ ...prevState, search: value })),
        setPersonalizeBy: (value: string) => setState((prevState) => ({ ...prevState, personalizeBy: value })),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};