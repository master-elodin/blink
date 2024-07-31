import { Input } from 'antd';
import * as React from 'react';
import { IConceptProperties, ISearchResult } from './types.ts';
import { findSearchResults, findSpellingResults } from './api.ts';
import { useState } from 'react';

interface IProps {
  onSelect: (newVal: IConceptProperties) => void;
}

const SearchPage = ({ onSelect }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<ISearchResult>();
  const [spellingResult, setSpellingResult] = React.useState<string | undefined>();
  const [noResults, setNoResults] = React.useState(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setNoResults(false);
    setSpellingResult(undefined);
  };

  const loadSearchResults = async (val: string): Promise<ISearchResult | undefined> => {
    const results = await findSearchResults(val);
    if (results.drugGroup.conceptGroup?.length > 0) {
      return results;
    }
    return undefined;
  };

  const onSearch = async () => {
    setIsLoading(true);
    setNoResults(false);
    setSearchResults(undefined);
    setSpellingResult(undefined);

    // TODO: error handling
    try {

      let result = await loadSearchResults(searchVal);
      if (!result) {
        const spellingResults = await findSpellingResults(searchVal);
        const firstSuggestion = spellingResults.suggestionGroup.suggestionList?.suggestion?.[0];
        if (firstSuggestion) {
          setSpellingResult(firstSuggestion);
          result = await loadSearchResults(firstSuggestion);
        } else {
          setNoResults(true);
        }
      }
      if (result) {
        setSearchResults(result);
      }
    } catch (error) {
      console.log('Failed fetching', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (<div className={'search-page'}>
      <div className={'search-container'}>
        <Input.Search placeholder={'Search for drugs'}
                      autoFocus={true}
                      loading={isLoading}
                      onSearch={onSearch}
                      value={searchVal}
                      onChange={onSearchChange}
                      style={{ width: 200 }} />
        {spellingResult &&
          <div className={'search-results__spelling'}>
            Showing results for <b>{spellingResult}</b> (corrected from <i>{searchVal}</i>)
          </div>}
      </div>
      <div className={'search-results'}>
        {noResults && <div>No results found for <b>{searchVal}</b></div>}
        {searchResults &&
          searchResults.drugGroup.conceptGroup
            .filter(conceptGroup => conceptGroup.conceptProperties?.length > 0)
            .map((conceptGroup, index) => {
              return (<div key={index}>
                {conceptGroup.conceptProperties?.map(prop => {
                  return (
                    <div key={prop.rxcui} className={'search-result'}
                         onClick={() => onSelect(prop)}>{prop.name}</div>);
                })}
              </div>);
            })
        }
      </div>
    </div>
  );
};

export default SearchPage;
