// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

AppCurrentTrends.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired,
};

export default function AppCurrentTrends({ title, subheader, list, ...other }) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Scrollbar>
                <Stack spacing={1} sx={{ p: 3, pr: 0 }}>
                    {list.map((news) => (
                        <NewsItem key={news.id} news={news} />
                    ))}
                </Stack>
            </Scrollbar>
        </Card>
    );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
    news: PropTypes.shape({
        description: PropTypes.string,
        image: PropTypes.string,
        postedAt: PropTypes.instanceOf(Date),
        title: PropTypes.string,
    }),
};

function NewsItem({ news }) {
    const { title, description, postedAt } = news;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>

            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                    {title}
                </Link>

                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                    {description}
                </Typography>
            </Box>

            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {fToNow(postedAt)}
            </Typography>
        </Stack>
    );
}
