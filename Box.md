## Box Format

### moov box

| Field | Type | Description |
| --- | --- | --- |
| size | 4字节 | Box size |
| type | 4字节 | Box type, must be `moov` |
| payload | N | 表示box的有效载荷，即媒体内容的元数据信息 |

### track box

| Field | Type | Description |
| --- | --- | --- |
| size | 4字节 | Box size |
| type | 4字节 | Box type, must be `track` |
| payload | N | 表示box的有效载荷，即轨道的元数据信息 |

### edts box

| Field | Type | Description |
| --- | --- | --- |
| size | 4字节 | Box size |
| type | 4字节 | Box type, must be `edts` |
| edit list box | N | 表示box的有效载荷，即轨道的元数据信息 |

### mdat box

| Field | Type | Description |
| --- | --- | --- |
| size | 4字节 | Box size |
| type | 4字节 | Box type, must be `mdat` |
| data | N | 实际的媒体数据 |

### mdia box

| Field | Type | Description |
| --- | --- | --- |
| size | 4字节 | Box size |
| type | 4字节 | Box type, must be `mdia` |
| mdhd box | N | Media Header Box: 该Box包含了关于媒体轨道的一般信息，如时间刻度、持续时间和语言等 |
| hdlr box | N | Handler Reference Box: Box指定了负责解释媒体数据的媒体处理组件 |
| minf box | N | Media Information Box: 该Box包含了关于媒体轨道的具体信息，如编解码器细节、样本描述和其他元数据等 |
