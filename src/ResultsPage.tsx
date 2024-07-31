import './ResultsPage.css';
import { IConceptProperties, IRxcuiResponse } from './types.ts';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { findRXCUIResults } from './api.ts';
import { Link } from 'react-router-dom';

interface IProps {
  selected: IConceptProperties;
}

const ResultsPage = ({ selected }: IProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ndcs, setNdcs] = useState<IRxcuiResponse>();
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setNdcs(await findRXCUIResults(selected.rxcui));
      setIsLoading(false);
    };
    if (!ndcs) {
      load();
    }
  }, [ndcs, selected]);

  return (
    <div className={'results-page'}>
      <div className={'results-page-first'}>
        <h4>Drug basics <Link to={'/drugs/search'}>back to Search</Link></h4>
        <div className={'results-page__summary-item'} title={selected.rxcui}><b>ID:</b> {selected.rxcui}</div>
        <div className={'results-page__summary-item'} title={selected.name}><b>Name:</b> {selected.name}</div>
        <div className={'results-page__summary-item'} title={selected.synonym}><b>Synonym:</b> {selected.synonym}</div>
      </div>
      <div className={'results-page-ndc'}>
        <h4>Associated NDCs</h4>
        {isLoading && <Spin />}
        {!isLoading &&
          <>
            {ndcs.ndcGroup.ndcList.ndc &&
              <ul>
                {ndcs.ndcGroup.ndcList.ndc.map(ndc => <li key={ndc}>{ndc}</li>)}
              </ul>
            }
            {!ndcs.ndcGroup.ndcList.ndc &&
              <span>No NDCs found</span>
            }
          </>
        }
      </div>
    </div>
  );
};

export default ResultsPage;
