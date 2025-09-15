import React, { FC } from 'react';

export interface IResultProps {
  resultInfo?: any;
}

const Result: FC<IResultProps> = ({ resultInfo }) => {
  return (
    <div className="p-4 bg-white/10 rounded-lg mt-4">
      <p className="text-white font-medium mb-2">Result:</p>
      <div className="bg-white/20 p-3 rounded-lg text-white/90 min-h-12">
        {resultInfo}
      </div>
    </div>
  );
};
export default Result;
