import s from './Table.module.css';

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  /** 숫자 열은 right — tabular-nums 적용 */
  align?: 'left' | 'right' | 'center';
}

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  data: Record<string, React.ReactNode>[];
  /** 데이터 없을 때 문구 */
  emptyText?: React.ReactNode;
  /** 행 hover 배경 */
  interactive?: boolean;
}

/** 데이터 테이블. 헤더 40 · 행 48 · 셀 좌우 16. 넓으면 wrap이 가로 스크롤. */
export function Table({ columns, data, emptyText = '데이터가 없습니다', interactive, className, style, ...rest }: TableProps) {
  return (
    <div className={[s.wrap, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <table className={s.table} data-interactive={interactive || undefined}>
        <thead><tr>{columns.map(c => <th key={c.key} className={s.th} style={{ textAlign: c.align ?? 'left' }}>{c.header}</th>)}</tr></thead>
        <tbody>
          {data.length === 0
            ? <tr><td className={s.empty} colSpan={columns.length}>{emptyText}</td></tr>
            : data.map((row, i) => (
              <tr key={i} className={s.tr}>
                {columns.map(c => <td key={c.key} className={s.td} style={{ textAlign: c.align ?? 'left' }}
                  data-num={c.align === 'right' || undefined}>{row[c.key]}</td>)}
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}
