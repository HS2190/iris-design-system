import s from './BottomSheet.module.css';

export interface BottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  children: React.ReactNode;
}

/** 모바일 하단 시트(표현부). 그래버 36×4 · 상단 radius-sheet, 스크림·제스처는 앱 셸 담당. */
export function BottomSheet({ title, children, className, style, ...rest }: BottomSheetProps) {
  return (
    <div className={[s.root, className].filter(Boolean).join(' ')} style={style} role="dialog" aria-modal="true" {...rest}>
      <span className={s.grabber} aria-hidden />
      {title && <span className={s.title}>{title}</span>}
      <div className={s.body}>{children}</div>
    </div>
  );
}
