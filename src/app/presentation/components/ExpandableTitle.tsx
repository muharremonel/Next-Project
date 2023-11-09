import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Chip } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  borderRadius: '5px',
  margin: '10px 0px',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(450deg)',
    transition: '.3s',
    marginRight: '10px'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Line = ({ name, progress, index }: { name: string, progress: number, index: string }) => {
  return (
    <div className='w-full flex justify-between items-center px-4'>
      <div className='flex items-center gap-2 '><p className='font-medium text-xs'>{index}</p> <p>{name}</p></div>
      <Chip label={`% ${progress}`}/>
    </div>
  )
}

export default function ExpandableTitle({ data }: { data: { title: string, content: any }[] }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {
        data?.map((item, index) => <Accordion key={`${item?.title}${index}accordion`} onChange={handleChange(item?.title)}>
          <AccordionSummary >
            <div className='flex gap-2 items-center'><p className='font-semibold text-sm'>{index + 1 + '. '}</p>{item?.title}</div>
          </AccordionSummary>
          {item?.content?.map((i: any, n: number) => (
            <AccordionDetails key={`accrodiondetail${n}`}>
              <Line index={`${index + 1}.${n + 1}`} name={i?.name} progress={i?.progress} />
            </AccordionDetails>
          ))}
        </Accordion>
        )}
    </div>
  );
}
