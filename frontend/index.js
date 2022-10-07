import { globalConfig } from '@airtable/blocks';
import {
    Button,
    initializeBlock,
    useBase,
    useSynced,
    Dialog,
    Heading,
    FormField,
    Input,
    Switch
} from '@airtable/blocks/ui';
import React, { useEffect, useState } from 'react';
import services from '../services';

globalConfig.setAsync( 'batchSize', 50 );
globalConfig.setAsync( 'isLoading', false );
globalConfig.setAsync( 'connected', false );
// globalConfig.setAsync( 'lastSync', new Date().toDateString() );
services.fetch.testConnection();

const Logs = () => {
    const [ logs ] = useSynced( 'logs' );
    if( !logs ) globalConfig.setAsync( 'logs', [] );
    return(
        <div style={ {  marginTop: '10px' }}>
            { logs && logs.map( ( v, i ) => {
                return(<div key={ i } >{ v }</div>)
            })}
        </div>
    )
}

const Settings = ( { isSettingsOpen, setIsSettingsOpen } ) => {
    const [ teamworkUrl, setTeamworkUrl ] = useSynced( 'teamworkUrl' );
    const [ username, setUsername ] = useSynced( 'username' );
    const [ password, setPassword ] = useSynced( 'password' );
    const [ batchSize, setBatchSize ] = useSynced( 'batchSize' );
    const [ connected ] = useSynced( 'connected' );
    const [isEnabled, setIsEnabled] = useSynced( 'active' );
    const [ autoSyncInterval ] = useSynced( 'autoSyncInterval' );

    return (
        <>
            {isSettingsOpen && (
            <Dialog onClose={() => setIsSettingsOpen(false)} width="320px">
                <Dialog.CloseButton />
                <div style={ { position: 'absolute', right: '12%' } }>
                    <small style={ { padding: '5px 8px', borderRadius: '8px', background: connected ? 'green' : 'red', color: 'white' } }>
                        { !connected && 'not' } connected
                    </small>
                </div>
                <Heading>Settings</Heading>
                <div style={ {  marginTop: '15px' }}>
                    <Switch
                        value={isEnabled}
                        onChange={newValue => setIsEnabled(newValue)}
                        label="Update changes to Teamwork"
                        width="100%"
                        marginBottom="15px"
                        style={{ 'font-size': '13px', 'font-weight': '500' }}
                    />
                    <FormField label="Teamwork url">
                        <Input 
                            value={ teamworkUrl } 
                            onChange={ e => setTeamworkUrl(e.target.value) } 
                            type='url'
                        />
                    </FormField>
                    <FormField label="Username">
                        <Input 
                            value={ username } 
                            onChange={ e => setUsername(e.target.value) } 
                            type='text'
                        />
                    </FormField>
                    <FormField label="Password">
                        <Input 
                            value={ password } 
                            onChange={ e => setPassword(e.target.value) } 
                            type='password'
                        />
                    </FormField>
                    <FormField label="API Write Data / second">
                        <Input 
                            value={ batchSize } 
                            onChange={ e => setBatchSize(e.target.value) } 
                            type='text'
                        />
                    </FormField>
                    <FormField label="Auto Sync Interval (in seconds)">
                        <Input 
                            value={ autoSyncInterval } 
                            onChange={ e => globalConfig.setAsync( 'autoSyncInterval', e.target.value < 10 ? 10 : e.target.value ) } 
                            type='number'
                        />
                    </FormField>
                </div>
                <div style={ {textAlign: 'right' } }>
                    <Button 
                        onClick={() => setIsSettingsOpen(false)}
                        size='small'
                        variant='danger'
                    >Close</Button>
                    <Button 
                        onClick={ () => services.fetch.testConnection() }
                        size='small'
                        variant='primary'
                        style={ { marginLeft: '5px' } }
                    >Connect</Button>
                </div>
            </Dialog>
            )}
        </>
    )
}

function TeamworkSync() {
    const [ isLoading ] = useSynced( 'isLoading' );
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [ connected ] = useSynced( 'connected' );
    const lastSync = globalConfig.get( 'lastSync' );
    
    const base = useBase();
    services.watch.all( base );
    useEffect(() => {
      if( connected && lastSync ) services.sync.full( true );
    }, [])
    
    return (
        <>
            <div style={ { padding: '10px' } }>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                    <div>{ base.name } 🚀</div>

                    <div>
                        <Button 
                            variant= 'primary'
                            size='small'
                            icon={ isLoading ? "history" : "play" }
                            onClick={ () => services.sync.full() }
                            disabled={ isLoading | !connected }
                        >
                            { isLoading ? 'syncing...' : 'Full Sync' }
                        </Button>

                        <Button 
                            onClick={ () => setIsSettingsOpen( true ) }
                            icon="settings" 
                            variant='default' 
                            size='small' 
                            style={ { marginLeft: '5px' } }
                        />
                    </div>
                </div>

                <hr style={ { marginTop: '10px' } }/>

                <Logs />
                <Settings isSettingsOpen={ isSettingsOpen } setIsSettingsOpen={ setIsSettingsOpen } />
            </div>
        </>
    );
}

initializeBlock(() => <TeamworkSync />);