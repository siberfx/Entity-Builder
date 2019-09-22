<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle</span>
                        <span class="icon-bar"></span>
                    </span>
                    <span class="navbar-brand">Entity</span>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li v-bind:class="{active: 'project' == bus.tab}">
                            <a @click="bus.showTab('project')" href="javascript:void(0);">Project</a>
                        </li>

                        <li v-bind:class="{active: 'file' == bus.tab}">
                            <a @click="bus.showTab('file')" href="javascript:void(0);">File</a>
                        </li>

                        <li v-bind:class="{active: 'diagram' == bus.tab}">
                            <a @click="bus.showTab('diagram')" href="javascript:void(0);">Diagram</a>
                        </li>

                        <li v-bind:class="{active: 'Migration' == bus.tab}">
                            <a @click="bus.showTab('Migration')" href="javascript:void(0);">Table</a>
                        </li>

                        <li v-bind:class="{active: 'Model' == bus.tab}">
                            <a @click="bus.showTab('Model')" href="javascript:void(0);">Model</a>
                        </li>

                        <li v-bind:class="{active: 'Request' == bus.tab}">
                            <a @click="bus.showTab('Request')" href="javascript:void(0);">Request</a>
                        </li>

                        <li v-bind:class="{active: 'Factory' == bus.tab}">
                            <a @click="bus.showTab('Factory')" href="javascript:void(0);">Factory</a>
                        </li>

                        <li v-if="bus.project" v-bind:class="{active: 'more' == bus.tab}" class="dropdown">
                            <a @click="bus.showTab('more')" href="javascript:void(0);">More</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="https://github.com/GooGee/Entity-Builder">GitHub</a></li>
                    </ul>
                </div>
                <!-- /.nav-collapse -->
            </div>
            <!-- /.container -->
        </nav>
        <!-- /.navbar -->

        <div style="margin-top:55px"></div>
    </div>
</template>

<script>
    import bus from '../helper/event';

    export default {
        name: 'Bar',
        data() {
            return {
                bus
            };
        }
    };
</script>
