import { globalConfig } from '@airtable/blocks';
import {
    Button,
    initializeBlock,
    useBase,
    useSynced,
} from '@airtable/blocks/ui';
import React from 'react';
import services from '../services';

// globalConfig.setAsync( 'teamworkUrl', 'https://stoplight.io/mocks/teamwork-dot-com/teamwork/42258908' );
globalConfig.setAsync( 'teamworkUrl', 'https://hamdanscompany.teamwork.com' );
globalConfig.setAsync( 'batchSize', 50 );
globalConfig.setAsync( 'isLoading', false );

const Logs = () => {
    const [ logs, setLogs ] = useSynced( 'logs' );
    
    return(
        <div style={{ marginTop: '10px' }}>
            {logs.map( ( v, i ) => {
                return(<div key={ i } >{ v }</div>)
            })}
        </div>
    )
}

function TeamworkSync() {
    const [ isLoading ] = useSynced( 'isLoading' );

    const base = useBase();
    services.watch.all( base );
    
    return (
        <>
            <div style={{padding: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>{ base.name } 🚀</div>

                    <Button 
                        variant= 'primary'
                        size='small'
                        icon={ isLoading ? "history" : "play" }
                        onClick={ () => services.sync.full() }
                        disabled={ isLoading }
                    >
                        { isLoading ? 'syncing...' : 'Full Sync' }
                    </Button>
                </div>

                <hr style={{marginTop: '10px'}}/>

                <Logs />
            </div>
        </>
    );
}

initializeBlock(() => <TeamworkSync />);