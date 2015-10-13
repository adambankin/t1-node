var entitymap = {
    'atomic_creative': 'atomic_creatives',
    'ad_server': 'ad_server',
    'advertiser': 'advertisers',
    'agency': 'agencies'
};

export function get_endpoint(entity:string) {
    return entitymap[entity];
}
